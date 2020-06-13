const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;
const { checkToken } = require("../auth/utils/checkToken");

const {
  getUserId,
  getUsername,
  getFollowingProjects,
  getCreatedProjects
} = require("../utils/user_utils");

const ModelSchema = require("../public/schema/projectSchema.js").projectSchema;
const UpdateSchema = require("../public/schema/updateSchema.js").updateSchema;

const {
  stakeholdersSchema,
  challengesSchema,
  insightsSchema
} = require("../public/schema/phaseDetailSchema.js");

const SUCCESS = 200;

router.get("/", function(req, res) {
  let sdg_par = req.query.sdg;
  let sdg_num = parseInt(sdg_par);
  let searchPageReq = req.query.searchPage;
  const db = req.db;
  const collection = db.get("projects");
  if (sdg_par && !isNaN(sdg_num)) {
    collection.find(
      {
        sdg: sdg_num
      },
      {
        $exists: true
      },
      function(e, docs) {
        res.send(docs);
      }
    );
  } else if (searchPageReq) {
    collection.find({}, { fields: { phases: 0 } }, function(e, docs) {
      res.send(docs);
    });
  } else {
    collection.find({}, {}, function(e, docs) {
      res.send(docs);
    });
  }
});

router.get("/userCreatedModels", checkToken, async function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const userEmail = req.decoded.sub;
  const createdProjects = await getCreatedProjects(db, userEmail);

  collection.find(
    {
      _id: { $in: createdProjects }
    },
    {
      $exists: true
    },
    function(e, docs) {
      res.send(docs);
    }
  );
});

router.get("/userFollowingModels", checkToken, async function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const userEmail = req.decoded.sub;
  const followingProjects = await getFollowingProjects(db, userEmail);

  collection.find(
    {
      _id: { $in: followingProjects }
    },
    {
      $exists: true
    },
    function(e, docs) {
      res.send(docs);
    }
  );
});

router.get("/:model_ID", function(req, res) {
  const db = req.db;
  let id = req.params.model_ID;
  const collection = db.get("projects");
  collection
    .findOne({ _id: id })
    .then(model => (model !== null ? res.send(model) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

router.post(
  "/",
  checkToken,
  validate({
    body: ModelSchema
  }),
  async function(req, res) {
    const db = req.db;
    const userEmail = req.decoded.sub;

    const collection = db.get("projects");
    let data = req.body;
    let currProjectId;

    data.numUpvotes = 0;
    data.numComments = 0;
    data.ownerId = await getUserId(db, userEmail);
    data.username = await getUsername(db, userEmail);
    if (data.name.length < 3 || data.name.length > 50) {
      res.sendStatus(500);
    } else if (data.description && data.description.length > 350) {
      res.sendStatus(500);
    } else {
      // Check if data includes proper fields
      const project = await collection.insert(data, function(err) {
        if (err) {
          return res.sendStatus(500);
        }
        currProjectId = data._id;
      });

      const updates = db.get("updates");
      const email = req.user.email;
      const username = await getUsername(db, email);
      const update = {
        type: "project",
        username: username,
        projectId: currProjectId,
        description: data.name,
        date: Date.now()
      };

      try {
        validate({ body: UpdateSchema });
        updates.insert(update);
      } catch (err) {
        return err;
      }
      res.status(SUCCESS).send({
        code: SUCCESS,
        success: true,
        message: `${data.name} added!`,
        data: project
      });
    }
  }
);

router.delete("/:model_ID", checkToken, function(req, res) {
  const db = req.db;
  let id = req.params.model_ID;
  const collection = db.get("projects");
  collection
    .findOneAndDelete({ _id: id })
    .then(model =>
      model !== null
        ? res.json({
            success: `${id} deleted!`
          })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));

  // TODO: Remove project from userFollwowing if it gets deleted
});

router.put(
  "/:model_ID",
  validate({
    body: ModelSchema
  }),
  function(req, res) {
    const db = req.db;
    const id = req.params.model_ID;
    const collection = db.get("projects");
    collection
      .findOneAndUpdate(
        {
          _id: id
        },
        req.body
      )
      .then(model =>
        model !== null
          ? res.json({ success: `${id} updated!` })
          : res.sendStatus(404)
      )
      .catch(() => res.sendStatus(500));
  }
);

router.get("/:model_ID/canEdit", checkToken, async function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID } = req.params;

  const userEmail = req.decoded.sub;
  const userId = await getUserId(db, userEmail);

  collection
    .findOne({
      _id: model_ID,
      ownerId: userId
    })
    .then(model =>
      model !== null ? res.json({ success: true }) : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(404));
});

router.post("/:model_ID", checkToken, async (req, res) => {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID } = req.params;
  const { name, description, groupSize } = req.body;

  const userEmail = req.decoded.sub;
  const userId = await getUserId(db, userEmail);

  collection
    .findOneAndUpdate(
      {
        _id: model_ID,
        ownerId: userId
      },
      { $set: { name, description, groupSize } }
    )
    .then(model =>
      model !== null
        ? res.json({ success: `${name} updated!` })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

router.get("/:model_ID/:phaseName/stakeholders", (req, res) => {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID, phaseName } = req.params;

  collection
    .findOne({
      _id: model_ID
    })
    .then(model => {
      if (model !== null) {
        const phase = model.phases[phaseName];
        const stakeholders = phase.stakeholders;
        res.json({ stakeholders });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => res.sendStatus(500));
});

router.post(
  "/:model_ID/:phaseName/stakeholders",
  validate({ body: stakeholdersSchema }),
  checkToken,
  async (req, res) => {
    const db = req.db;
    const collection = db.get("projects");
    const { model_ID, phaseName } = req.params;
    const { stakeholders } = req.body;

    const userEmail = req.decoded.sub;
    const userId = await getUserId(db, userEmail);

    collection
      .findOneAndUpdate(
        {
          _id: model_ID,
          ownerId: userId
        },
        { $set: { [`phases.${phaseName}.stakeholders`]: stakeholders } }
      )
      .then(model =>
        model !== null
          ? res.json({
              success: `Stakeholders updated!`
            })
          : res.sendStatus(404)
      )
      .catch(() => res.sendStatus(500));
  }
);

router.get("/:model_ID/:phaseName/challenges", (req, res) => {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID, phaseName } = req.params;

  collection
    .findOne({
      _id: model_ID
    })
    .then(model => {
      if (model !== null) {
        const phase = model.phases[phaseName];
        const challenges = phase.challenges;
        res.json({ challenges });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => res.sendStatus(500));
});

router.post(
  "/:model_ID/:phaseName/challenges",
  validate({ body: challengesSchema }),
  checkToken,
  async (req, res) => {
    const db = req.db;
    const collection = db.get("projects");
    const { model_ID, phaseName } = req.params;
    const { challenges } = req.body;

    const userEmail = req.decoded.sub;
    const userId = await getUserId(db, userEmail);

    collection
      .findOneAndUpdate(
        {
          _id: model_ID,
          ownerId: userId
        },
        { $set: { [`phases.${phaseName}.challenges`]: challenges } }
      )
      .then(model =>
        model !== null
          ? res.json({
              success: `Challenges updated!`
            })
          : res.sendStatus(404)
      )
      .catch(() => res.sendStatus(500));
  }
);

router.get("/:model_ID/:phaseName/insights", (req, res) => {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID, phaseName } = req.params;

  collection
    .findOne({
      _id: model_ID
    })
    .then(model => {
      if (model !== null) {
        const phase = model.phases[phaseName];
        const insights = phase.insights;
        res.json({ insights });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => res.sendStatus(500));
});

router.post(
  "/:model_ID/:phaseName/insights",
  validate({ body: insightsSchema }),
  checkToken,
  async (req, res) => {
    const db = req.db;
    const collection = db.get("projects");
    const { model_ID, phaseName } = req.params;
    const { insights } = req.body;

    const userEmail = req.decoded.sub;
    const userId = await getUserId(db, userEmail);

    collection
      .findOneAndUpdate(
        {
          _id: model_ID,
          ownerId: userId
        },
        { $set: { [`phases.${phaseName}.insights`]: insights } }
      )
      .then(model =>
        model !== null
          ? res.json({
              success: `Insights updated!`
            })
          : res.sendStatus(404)
      )
      .catch(() => res.sendStatus(500));
  }
);

router.post(
  "/:model_ID/:phaseName/stages/:stageName",
  checkToken,
  async function(req, res) {
    const db = req.db;
    const collection = db.get("projects");
    const { model_ID, phaseName, stageName } = req.params;

    const { startdate, enddate, description } = req.body;
    if (startdate === undefined) {
      res.sendStatus(400);
      return;
    }

    const userEmail = req.decoded.sub;
    const userId = await getUserId(db, userEmail);

    const newStage = { name: stageName, description, startdate };

    if (enddate !== undefined) {
      newStage.enddate = enddate;
    }

    collection
      .findOneAndUpdate(
        {
          _id: model_ID,
          ownerId: userId
        },
        { $push: { [`phases.${phaseName}.stages`]: newStage } }
      )
      .then(model =>
        model !== null
          ? res.json({ success: `${stageName} added!` })
          : res.sendStatus(404)
      )
      .catch(() => res.sendStatus(500));
  }
);

router.put(
  "/:model_ID/:phaseName/:stageName/description",
  checkToken,
  async function(req, res) {
    const db = req.db;
    const collection = db.get("projects");
    const { model_ID, phaseName, stageName } = req.params;
    const description = req.body.description;
    const subDescription = req.body.subDescription;
    if (description === undefined) {
      return res.sendStatus(400);
    }

    const userEmail = req.decoded.sub;
    const userId = await getUserId(db, userEmail);

    collection
      .findOneAndUpdate(
        {
          _id: model_ID,
          ownerId: userId,
          [`phases.${phaseName}.stages.name`]: stageName
        },
        { $set: { [`phases.${phaseName}.stages.$.description`]: description } }
      )
      .then(model => {
        if (model === null) {
          return res.sendStatus(404);
        }
      })
      .catch(() => res.sendStatus(500));

    const updates = db.get("updates");
    const email = req.user.email;
    const username = await getUsername(db, email);
    const update = {
      type: "stage",
      username: username,
      projectId: model_ID,
      description: stageName,
      subDescription: subDescription,
      date: Date.now()
    };

    try {
      validate({ body: UpdateSchema });
      updates.update(
        {
          description: stageName,
          projectId: model_ID
        },
        {
          $set: update
        },
        {
          upsert: true
        }
      );
    } catch (err) {
      return err;
    }

    res.json({ success: `${stageName} description updated!` });
  }
);

router.get("/:model_ID/:phaseName/:stageName/description", function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID, phaseName, stageName } = req.params;
  collection
    .findOne({ _id: model_ID })
    .then(model => {
      if (model === null) {
        res.sendStatus(404);
      } else {
        const stages = model.phases[phaseName].stages;
        const stage = stages.filter(s => s.name === stageName)[0];
        stage !== undefined
          ? res.json({
              description: stage.description
            })
          : res.sendStatus(404);
      }
    })
    .catch(() => res.sendStatus(500));
});

router.get("/:numUpdates/:lastID", function(req, res) {
  const ObjectId = require("mongodb").ObjectID;
  const last_ID = new ObjectId(req.params.lastID);
  const db = req.db;
  const collection = db.get("projects");
  collection.find(
    {
      _id: { $gt: last_ID }
    },
    {
      $exists: true,
      limit: parseInt(req.params.numUpdates)
    },
    function(e, docs) {
      if (docs) {
        res.send(docs);
      } else {
        res.sendStatus(400);
      }
    }
  );
});
module.exports = router;
