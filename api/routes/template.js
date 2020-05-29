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
  const id = req.params.template_ID;
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

// get specific template by id (clicking on template in dropdown menu)
router.get("/:template_ID", function(req, res) {
  const db = req.db;
  const id = req.params.template_ID;
  const collection = db.get("templates");
  collection
    .findOne({ _id: id })
    .then(template =>
      template !== null ? res.send(template) : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

// TODO: Change all of these into one put function

// edit entire template by ID (hitting save and exit)
router.put("/:template_ID", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  const { template_ID } = req.params;
  const { draft, name, phases, creatorID } = req.body;
  collection
    .findOneAndUpdate(
      {
        _id: template_ID
      },
      { $set: { draft, phases, name, creatorID } }
    )
    .then(template =>
      template !== null
        ? res.json({ success: `${template_ID} updated!` })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

// edit draft of template by ID (what draftjs will do for template draft)
router.put("/:template_ID/draft", function(req, res) {
  const db = req.db;
  const collection = db.get("templates");
  const { template_ID } = req.params;
  const draft = req.body.draft;

  if (draft === undefined) {
    res.sendStatus(400);
    return;
  }

  collection
    .findOneAndUpdate(
      {
        _id: template_ID
      },
      { $set: { draft } }
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
    return;
  }

  collection
    .findOneAndUpdate(
      {
        _id: template_ID
      },
      { $set: { name } }
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
    return;
  }

  collection
    .findOneAndUpdate(
      {
        _id: template_ID
      },
      { $set: { phases } }
    )
    .then(template =>
      template !== null
        ? res.json({ success: `${template_ID} updated!` })
        : res.sendStatus(404)
    )
    .catch(() => res.sendStatus(500));
});

module.exports = router;
