import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { profile } from "console";
console.log(profile);

const schema = a.schema({
  Address: a
    .model({
      street: a.string(),
      street2: a.string(),
      city: a.string(),
      state: a.string(),
      zipCode: a.string(),
      country: a.string(),
      // Address can belong to a Profile…
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      // …or to a Job Opening.
      openingId: a.string(),
      opening: a.belongsTo("Opening", "openingId"),
    })
    .authorization((allow) => [allow.owner()]),

  Certification: a
    .model({
      certification_name: a.string(),
      issuing_organization: a.string(),
      year_earned: a.string(),
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),

  Degree: a
    .model({
      degree: a.string(),
      school_name: a.string(),
      start_date: a.date(),
      end_date: a.date(),
      notable_achievements: a.string().array(),
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),

  Experience: a
    .model({
      job_title: a.string(),
      company_name: a.string(),
      start_date: a.date(),
      end_date: a.date(),
      achievements: a.string().array(),
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      resumeId: a.string(),
      resume: a.belongsTo("Resume", "resumeId"),
      skills: a.hasMany("Skill", "experienceId"),
    })
    .authorization((allow) => [allow.owner()]),

  Opening: a
    .model({
      resumes: a.hasMany("Resume", "openingId"),
      job_title: a.string(),
      company_name: a.string(),
      full_job_description: a.string(),
      applied: a.boolean(),
      submission_date: a.date(),
      response_date: a.date(),
      status: a.string(),
      mode: a.string(), // e.g. "remote", "hybrid", "in person"
      // An opening can have multiple addresses (location) and skills.
      addresses: a.hasMany("Address", "openingId"),
      skills: a.hasMany("Skill", "openingId"),
      key_requirements: a.string().array(),
    })
    .authorization((allow) => [allow.owner()]),

  Profile: a
    .model({
      name: a.string(),
      email: a.email(),
      phone: a.phone(),
      socials: a.hasMany("Social", "profileId"),
      address: a.hasOne("Address", "profileId"),
      skills: a.hasMany("Skill", "profileId"),
      degrees: a.hasMany("Degree", "profileId"),
      certifications: a.hasMany("Certification", "profileId"),
      experiences: a.hasMany("Experience", "profileId"),
      resumes: a.hasMany("Resume", "profileId"),
    })
    .authorization((allow) => [allow.owner()]),

  Resume: a
    .model({
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      openingId: a.string(),
      opening: a.belongsTo("Opening", "openingId"),
      selected_template: a.string(),
      experiences: a.hasMany("Experience", "resumeId"),
      degrees: a.hasMany("Degree", "resumeId"),
      certifications: a.hasMany("Certification", "resumeId"),
    })
    .authorization((allow) => [allow.owner()]),

  Skill: a
    .model({
      technology: a.string().required(),
      isRelevant: a.boolean(),
      years_of_experience: a.integer(), // New field for years of experience
      // The skill can be associated with a Profile...
      profileId: a.string(),
      profile: a.belongsTo("Profile", "profileId"),
      // ...or with an Experience...
      experienceId: a.string(),
      experience: a.belongsTo("Experience", "experienceId"),
      // ...or with a Job Opening.
      openingId: a.string(),
      opening: a.belongsTo("Opening", "openingId"),
    })
    .authorization((allow) => [allow.owner()]),

  Social: a
    .model({
      type: a.string().required(),
      url: a.url().required(),
      profileId: a.string(),
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
