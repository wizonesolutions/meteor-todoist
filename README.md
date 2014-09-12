Todoist API wrapper for Meteor.

This is a wrapper for the Todoist API ([documentation](http://todoist.com/API)).
It's based on [JTarasovic/node-todoist-api](https://github.com/JTarasovic/node-todoist-api).

## Installation

`meteor add wizonesolutions:todoist`

## Usage

See the app this is used in to get ideas on how it works. It's pretty straightforward.

Link: [todoist-sorter](https://github.com/wizonesolutions/todoist-sorter)

## Roadmap

- Finish rewriting package so it can be used synchronously more easily (no more callback style). I'll probably have to wrap the existing methods to achieve this so I don't break BC. I can fully rewrite it in a new major release, though.

## Author

This Meteor package was written by [WizOne Solutions](http://www.wizonesolutions.com), a Meteor and Drupal CMS developer.

My largest Meteor app so far is [https://github.com/spendflow/spendflow](Spendflow). It has a private beta. Check it out.
