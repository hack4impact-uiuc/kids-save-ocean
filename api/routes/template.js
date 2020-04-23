const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const TemplateSchema = require("../public/schema/templateSchema.js")
  .templateSchema;

// create template (when tho? first save of draft!)
router.post(
  "/",
  validate({
    body: TemplateSchema
  }),
  function(req, res) {
    const db = req.db;
    const collection = db.get("templates");
    const data = req.body;

    // Check if data includes proper fields
    collection.insert(data, function(err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({
          success: `${data.name} added!`
        });
      }
    });
  }
);

// delete template by ID (delete button)
router.delete("/:template_ID", function(req, res) {
  // CHECK AUTH
  const db = req.db;
  let id = req.params.template_ID;
  const collection = db.get("templates");
  collection
    .findOneAndDelete({ _id: id })
    .then(template =>
      template !== null
        ? res.json({
            success: `${id} deleted!`
          })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

// get ALL templates (dropdown menus <- const of Template.jsx)
router.get("/", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  collection.find({}, {}, function(e, docs) {
    res.send(docs);
  });
});

// get specific template by id (clicking on template in dropdown menu, or maybe not used lol)
router.get("/:template_ID", function(req, res) {
  const db = req.db;
  let id = req.params.template_ID;
  const collection = db.get("templates");
  collection
    .findOne({ _id: id })
    .then(template =>
      template !== null ? res.send(template) : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

// get draft pertaining to template specified by id (for pulling up template by user or by admin)
router.get("/:template_ID/draft", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  const { template_ID } = req.params;
  collection
    .findOne({ _id: template_ID })
    .then(template => {
      if (template === null) {
        res.sendStatus(404);
      } else {
        const draft = template.draft;
        draft !== undefined
          ? res.json({
              draft: draft // { draft } ??
            })
          : res.sendStatus(404);
      }
    })
    .catch(() => res.sendStatus(500));
});

// get template's name by id
router.get("/:template_ID/name", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  const { template_ID } = req.params;
  collection
    .findOne({ _id: template_ID })
    .then(template => {
      if (template === null) {
        res.sendStatus(404);
      } else {
        const draft = template.draft;
        draft !== undefined
          ? res.json({
              draft: draft // { draft } ??
            })
          : res.sendStatus(404);
      }
    })
    .catch(() => res.sendStatus(500));
});

// edit entire template by ID (hitting save and exit)
router.put(
  "/:template_ID",
  validate({
    body: TemplateSchema
  }),
  function(req, res) {
    const db = req.db;
    const id = req.params.template_ID;
    const collection = db.get("templates");
    collection
      .findOneAndUpdate(
        {
          _id: id
        },
        req.body
      )
      .then(template =>
        template !== null
          ? res.json({ success: `${id} updated!` })
          : res.sendStatus(404)
      )
      .catch(() => res.sendStatus(500));
  }
);

// edit draft of template by ID (what draftjs will do for template draft)
router.put("/:template_ID/draft", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  const { template_ID } = req.params;
  const draft = req.body.draft;

  if (draft === undefined) {
    res.sendStatus(400);
  }

  collection
    .findOneAndUpdate(
      {
        _id: template_ID
      },
      { $set: { draft } } // draft : draft ??
    )
    .then(template =>
      template !== null
        ? res.json({ success: `${template_ID} updated!` })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

// edit name of template by ID (what draftjs will do for name draft)
router.put("/:template_ID/name", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  const { template_ID } = req.params;
  const name = req.body.name;

  if (name === undefined) {
    res.sendStatus(400);
  }

  collection
    .findOneAndUpdate(
      {
        _id: template_ID
      },
      { $set: { name } } // name : name ??
    )
    .then(template =>
      template !== null
        ? res.json({ success: `${template_ID} updated!` })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

// edit phases of template by ID (what draftjs will do for phase selectors)
router.put("/:template_ID/phases", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  const { template_ID } = req.params;
  const phases = req.body.phases;

  if (phases === undefined) {
    res.sendStatus(400);
  }

  collection
    .findOneAndUpdate(
      {
        _id: template_ID
      },
      { $set: { phases } } // phases : phases ??
    )
    .then(template =>
      template !== null
        ? res.json({ success: `${template_ID} updated!` })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

module.exports = router;
