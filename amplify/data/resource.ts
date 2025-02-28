import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/


// import { profile } from "console";
// console.log(profile)

// const schema = a.schema({
//   Todo: a
//     .model({
//       content: a.string(),
//     })
//     .authorization((allow) => [allow.publicApiKey()]),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: "apiKey",
//     apiKeyAuthorizationMode: {
//       expiresInDays: 30,
//     },
//   },
// });


import { profile } from "console";
console.log(profile)


const schema = a.schema({

  // Todo: a
  //   .model({
  //     content: a.string(),
  //   })
  //   .authorization((allow) => [allow.publicApiKey()]),


  // Address model: The candidate's address.
  Address: a
    .model({
      street: a.string(),
      street2: a.string(),
      city: a.string(),
      state: a.string(),
      zipCode: a.string(),
      country: a.string(),
      // Associate the address with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),

    })
    .authorization((allow) => [allow.owner()]),

  // Certification model.
  Certification: a
    .model({
      certification_name: a.string(),
      issuing_organization: a.string(),
      year_earned: a.string(),
      // Associate the certification with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      // Optionally, for a Resume:
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),


  // Degree model: Educational background.
  Degree: a
  .model({
    degree: a.string(),
    school_name: a.string(),
    start_date: a.date(),
    end_date: a.date(),
    notable_achievements: a.string().array(),
    // Associate the degree with a Profile.
    profileId: a.string(),
    profile: a.belongsTo("Profile", "profileId"),
    // Optionally, if you want to attach degrees directly to a Resume:
    resumeId: a.string(),
    resume: a.belongsTo("Resume", "resumeId"),  // Changed from a.hasMany to a.belongsTo

  })
  .authorization((allow) => [allow.owner()]),


  // Experience model: Work experience that can belong to either a Profile or a Resume.
  Experience: a
    .model({
      job_title: a.string(),
      company_name: a.string(),
      start_date: a.date(),
      end_date: a.date(),
      achievements: a.string().array(),
      // Associate the degree with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      // Optionally, if you want to attach degrees directly to a Resume:
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),
      skills: a.hasMany("Skill", "experienceId"),
    })
    .authorization((allow) => [allow.owner()]),

  // Opening model: A job opening.
  Opening: a
    .model({
      resumes: a.hasMany("Resume", "openingId"),
      job_title: a.string(),
      company_name: a.string(),
      job_description: a.string(),
      job_location: a.string(),
      salary_range: a.string(),
      employment_type: a.string(),
      key_requirements: a.string().array(),
    })
    .authorization((allow) => [allow.owner()]),



  // Profile model: The candidate’s main profile.
  Profile: a
  .model({
    name: a.string(),
    email: a.email(),
    phone: a.phone(),
    socials: a.hasMany("Social", "profileId"),
    // One-to-one relationship for address.
    address: a.hasOne("Address", "profileId"),
    // One-to-many relationships for skills, degrees, certifications, and experiences.
    skills: a.hasMany("Skill", "profileId"),
    degrees: a.hasMany("Degree", "profileId"),
    certifications: a.hasMany("Certification", "profileId"),
    experiences: a.hasMany("Experience", "profileId"),
    resumes: a.hasMany("Resume", "profileId"),
  })
  .authorization((allow) => [allow.owner()]),

  // Resume model: A tailored resume for a specific opening.
  Resume: a
    .model({
      profileId: a.string(), // Reference to the candidate’s profile.
      profile: a.belongsTo("Profile", "profileId"),
      openingId: a.string(), // The job opening this resume is tailored for.
      opening: a.belongsTo("Opening", "openingId"),
      selected_template: a.string(),
      // Link experiences relevant to this resume.
      experiences: a.hasMany("Experience", "resumeId"),
      // Optionally include degrees and certifications for this resume.
      degrees: a.hasMany("Degree", "resumeId"),
      certifications: a.hasMany("Certification", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),

  // Skill model: A candidate's technical skill.
  Skill: a
    .model({
      technology: a.string().required(),
      proficiency: a.string().required(),
      // Associate the skill with a Profile.
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      experienceId: a.string(),
      experience: a.belongsTo("Experience", "experienceId"),
    })
    .authorization((allow) => [allow.owner()]),

      // Social model: Represents a social link for a profile.
  Social: a
  .model({
    type: a.string().required(), 
    url: a.url().required(),
    profileId: a.string(), // Foreign key for association
    profile: a.belongsTo("Profile", "profileId"),
  })
  .authorization((allow) => [allow.owner()]),

});



export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});




/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUD-l  requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUD-L requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
