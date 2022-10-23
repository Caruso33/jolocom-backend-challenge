# Challenge

The challenge is split into two parts, with the second part building on the features developed in the first part. Both parts should be done in the same branch belonging to your fork of the base repository (see below for more). Your finished solution for each part should be tagged using git tags (e.g you'll end up with two tags: "part1" & "part2")

## Part 1

The scope for this part of the challenge is to fork and extend the [jolocom-backend-challenge](https://github.com/jolocom/jolocom-backend-challenge) with two new features to be exposed via an HTTP JSON API. It's flexible whether you take a RESTful aproach or some other aproach, its more about the reasoning behind your design. This is just an exercise, so don't be worried about creating a "perfect" production like system. Also feel free to add any dependencies / packages you think are warranted, but be prepared for us to ask about it later! When we review the challenge with you we will seek to understand why you made the design and implementations decisions you did, and you'll have the opportunity to explain how you might do things differently with more time or in a different context etc.

Design and implement appropriate HTTP+JSON API endpoints to deliver the following features:

---

#### Feature 1

It should be possible to create users, where a user must contain the following information.

```
The users name
The users email address
Whether the the user has "joined via invitation" or not
The time and date the user was created
The time and date of the last time any of the users information was updated
```

There is no limit on the number of users that can be created.

---

#### Feature 2

It should be possible to retreive a previously created user, returning all information for that user as described in feature 1.

---

**Implimentation constraint:** The users need to be persisted in a local database (sqlite recommended). It is important that for this part of the challenge the user data is persisted as one Entity / in one table (despite the data structure containing both user info and user related metadata).

Please ensure your branch contains a git tag (e.g. "part1") pointing to your finished solution for part 1.

To recap, the scope / main areas of work for this part of the challenge are:

1. Designing API endpoints to deliver features 1 and 2.
2. Forking the aforementioned example service repository, creating a new branch.
3. Extending the existing [OpenApi specification](https://github.com/jolocom/jolocom-backend-challenge/blob/main/src/api/openapi.yaml) with definitions for your new endpoints.
4. Setting up a local database (recommended: use an orm with support for migrations).
5. Defining the appropriate entity/table to persist a user
6. Defining the appropriate controller / operations for implimenting the endpoints you have designed.
7. Tag your solution to part1

## Part 2

This part builds on the functionality described in part 1.

At this point, the previously created user model / entity needs to be broken down / split into two separate entities:

One entity holding the "user info" consisting of:

```
The users name
The users email adress
```

And the second entity holding the "user metadata" consisting of everything else:

```
Whether the the user has "joined via invitation" or not
The time and date the user was created
The time and date of the last time any of the users information was updated
```

The API endpoints implimented in part 1 should continue to operate exactly the same from the clients perspective (e.g. accept / return exactly the same data), but internally will persist the data slightly differently. **More importantly, all existing user records persisted in part 1 should be migrated to the new database structure** such that a client could upgrade from part 1 to part 2 without losing data or seeing different behaviour than they expect.

Think about how you might write an automated test to validate that the migration behaves as desired. If you're comortable that your approach won't take too long / be too much of a pain, see if you can impliment it.

Please ensure your branch contains a git tag (e.g. "part2") pointing to your finished solution for part 2.

To recap, the scope / main areas of work are:

1. Splitting the previously defined User entity into two separate entities.
2. Migrating existing user records to the new structure.
3. Think about how you might impliment an automated test for your migration. We'll ask you about it after the challenge.
4. Bonus: Impliment your proposed test.
5. Tag your solution to part 2
