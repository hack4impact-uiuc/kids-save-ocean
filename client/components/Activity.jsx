// Likes/reacts, comments, and follow activities from followed users
import stream from "getstream";
import React from "react";

const client = stream.connect(
  "h95e3h7s4mew",
  "ac9xn8erfdjerzk8dd8853zv7247u68kgx4sxb4nmct94229p6c93rve9adzch9e"
);

const userToken = client.createUserToken("the-user-id");

const chris = client.feed("user", "chris");

// Add an Activity; message is a custom field - tip: you can add unlimited custom fields!
await chris.addActivity({
  actor: "chris",
  verb: "add",
  object: "picture:10",
  foreign_id: "picture:10",
  message: "Beautiful bird!"
});

// Create a following relationship between Jack's "timeline" feed and Chris' "user" feed:
const jack = client.feed("timeline", "jack");
await jack.follow("user", "chris");

// Read Jack's timeline and Chris' post appears in the feed:
const results = await jack.get({ limit: 10 });

// Remove an Activity by referencing it's Foreign Id:
await chris.removeActivity({ foreignId: "picture:10" });

// Initialize the client with your api key, no secret and your app id
const client = stream.connect("h95e3h7s4mew", null, "73454");

// For the feed group 'user' and user id 'eric' get the feed
// The user token is generated server-side for this user
const ericFeed = client.feed("user", "eric", "5l1t9un0YsYJYFRMOwzepi47Eys");

// Add the activity to the feed
ericFeed.addActivity({
  actor: "eric",
  tweet: "Hello world",
  verb: "tweet",
  object: 1
});

// Let Jessica's flat feed follow Eric's feed
const jessicaFlatFeed = client.feed(
  "timeline",
  "jessica",
  "HvebOxrlD72Vy2hxslBuk3ecix4"
);
jessicaFlatFeed.follow("user", "eric");

// activities posted on Eric's feed will now flow automatically in Jessica's feed
ericFeed.addActivity({
  actor: "eric",
  verb: "watch",
  object: 1,
  youtube_id: "JNwNXF9Y6kY",
  video_name: "Star Wars Trailer"
});
// Read the activities from Jessica's flat feed
jessicaFlatFeed.get({ limit: 3 }).then(callback);

// Get the feed for Jule's aggregated feed and follow Eric's user feed
const juleAggregatedFeed = client.feed(
  "timeline_aggregated",
  "jule",
  "65qAGSjduwr_jI6LkmKKWTQohh0"
);
juleAggregatedFeed.follow("user", "eric");
// Add an activity with the verb watch to Eric's feed
ericFeed.addActivity({
  actor: "eric",
  verb: "watch",
  object: 1,
  youtube_id: "0m_lU2RA9Ak",
  video_name: "Post-Rock Song"
});

// Read the last 3 activities from Jule's aggregated feed
juleAggregatedFeed.get({ limit: 3 }).then(callback2);
