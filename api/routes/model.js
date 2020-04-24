const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;
const { checkToken } = require("../auth/utils/checkToken");

const ModelSchema = require("../public/schema/projectSchema.js").projectSchema;

const { getUsername } = require("../utils/user_utils");

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

router.get("/:model_ID", function(req, res) {
  const db = req.db;
  let id = req.params.model_ID;
  const collection = db.get("projects");
  collection
    .findOne({ _id: id })
    .then(model => (model !== null ? res.send(model) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

// TODO; Check Validate
router.post(
  "/",
  validate({
    body: ModelSchema
  }),
  checkToken,
  function(req, res) {
    const db = req.db;
    const projects = db.get("projects");
    const data = req.body;
    let currProjectId;

    // Check if data includes proper fields
    projects.insert(data, function(err) {
      if (err) {
        res.sendStatus(500);
      } else {
        currProjectId = data._id;
      }
    });

    const updates = db.get("updates");
    const email = req.user.email;
    const username = await getUsername(db, email);
    const update = {
      updateType: "project",
      email: email,
      projectId: currProjectId,
      description: `${username} created ${data.name}`,
      date: Date.now()
    };

    try {
      updates.insert(update);
    } catch (err) {
      return err;
    }

    res.json({
      success: `${data.name} added!`
    });
  }
);

router.delete("/:model_ID", function(req, res) {
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

router.put("/:model_ID/:phaseName/:stageName/description", checkToken, function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID, phaseName, stageName } = req.params;

  const description = req.body.description;
  if (description === undefined) {
    res.sendStatus(400);
  }

  collection
    .findOneAndUpdate(
      {
        _id: model_ID,
        [`phases.${phaseName}.stages.name`]: stageName
      },
      { $set: { [`phases.${phaseName}.stages.$.description`]: description } }
    )
    .then(model => {
        if (model === null) {
          res.sendStatus(404)
        }
      }
    )
    .catch(() => res.sendStatus(500));
  
  const updates = db.get("updates");
  const email = req.user.email;
  const username = await getUsername(db, email);
  const update = {
    updateType: "project",
    email: email,
    projectId: model_ID,
    description: `${username} updated their ${stageName} stage`,
    subDescription: `${description}`,
    date: Date.now()
  };

  try {
    updates.insert(update);
  } catch (err) {
    return err;
  }

  res.json({ success: `${stageName} description updated!` })
});

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
