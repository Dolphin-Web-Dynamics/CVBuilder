/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      city
      country
      createdAt
      id
      opening {
        applied
        company_name
        createdAt
        full_job_description
        id
        job_title
        key_requirements
        mode
        owner
        response_date
        status
        submission_date
        updatedAt
        __typename
      }
      openingId
      owner
      profile {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      state
      street
      street2
      updatedAt
      zipCode
      __typename
    }
  }
`;
export const getCertification = /* GraphQL */ `
  query GetCertification($id: ID!) {
    getCertification(id: $id) {
      certification_name
      createdAt
      id
      issuing_organization
      owner
      profile {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      updatedAt
      year_earned
      __typename
    }
  }
`;
export const getDegree = /* GraphQL */ `
  query GetDegree($id: ID!) {
    getDegree(id: $id) {
      createdAt
      degree
      end_date
      id
      notable_achievements
      owner
      profile {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      school_name
      start_date
      updatedAt
      __typename
    }
  }
`;
export const getExperience = /* GraphQL */ `
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
      achievements
      company_name
      createdAt
      end_date
      id
      job_title
      owner
      profile {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      resume {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      resumeId
      skills {
        nextToken
        __typename
      }
      start_date
      updatedAt
      __typename
    }
  }
`;
export const getOpening = /* GraphQL */ `
  query GetOpening($id: ID!) {
    getOpening(id: $id) {
      addresses {
        nextToken
        __typename
      }
      applied
      company_name
      createdAt
      full_job_description
      id
      job_title
      key_requirements
      mode
      owner
      response_date
      resumes {
        nextToken
        __typename
      }
      skills {
        nextToken
        __typename
      }
      status
      submission_date
      updatedAt
      __typename
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      address {
        city
        country
        createdAt
        id
        openingId
        owner
        profileId
        state
        street
        street2
        updatedAt
        zipCode
        __typename
      }
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      email
      experiences {
        nextToken
        __typename
      }
      id
      name
      owner
      phone
      resumes {
        nextToken
        __typename
      }
      skills {
        nextToken
        __typename
      }
      socials {
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const getResume = /* GraphQL */ `
  query GetResume($id: ID!) {
    getResume(id: $id) {
      certifications {
        nextToken
        __typename
      }
      createdAt
      degrees {
        nextToken
        __typename
      }
      experiences {
        nextToken
        __typename
      }
      id
      opening {
        applied
        company_name
        createdAt
        full_job_description
        id
        job_title
        key_requirements
        mode
        owner
        response_date
        status
        submission_date
        updatedAt
        __typename
      }
      openingId
      owner
      profile {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      selected_template
      updatedAt
      __typename
    }
  }
`;
export const getSkill = /* GraphQL */ `
  query GetSkill($id: ID!) {
    getSkill(id: $id) {
      createdAt
      experience {
        achievements
        company_name
        createdAt
        end_date
        id
        job_title
        owner
        profileId
        resumeId
        start_date
        updatedAt
        __typename
      }
      experienceId
      id
      isRelevant
      opening {
        applied
        company_name
        createdAt
        full_job_description
        id
        job_title
        key_requirements
        mode
        owner
        response_date
        status
        submission_date
        updatedAt
        __typename
      }
      openingId
      owner
      profile {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      technology
      updatedAt
      years_of_experience
      __typename
    }
  }
`;
export const getSocial = /* GraphQL */ `
  query GetSocial($id: ID!) {
    getSocial(id: $id) {
      createdAt
      id
      owner
      profile {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      profileId
      type
      updatedAt
      url
      __typename
    }
  }
`;
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        city
        country
        createdAt
        id
        openingId
        owner
        profileId
        state
        street
        street2
        updatedAt
        zipCode
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCertifications = /* GraphQL */ `
  query ListCertifications(
    $filter: ModelCertificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCertifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        certification_name
        createdAt
        id
        issuing_organization
        owner
        profileId
        resumeId
        updatedAt
        year_earned
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listDegrees = /* GraphQL */ `
  query ListDegrees(
    $filter: ModelDegreeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDegrees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        degree
        end_date
        id
        notable_achievements
        owner
        profileId
        resumeId
        school_name
        start_date
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listExperiences = /* GraphQL */ `
  query ListExperiences(
    $filter: ModelExperienceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExperiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        achievements
        company_name
        createdAt
        end_date
        id
        job_title
        owner
        profileId
        resumeId
        start_date
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listOpenings = /* GraphQL */ `
  query ListOpenings(
    $filter: ModelOpeningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpenings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        applied
        company_name
        createdAt
        full_job_description
        id
        job_title
        key_requirements
        mode
        owner
        response_date
        status
        submission_date
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        email
        id
        name
        owner
        phone
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listResumes = /* GraphQL */ `
  query ListResumes(
    $filter: ModelResumeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResumes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        openingId
        owner
        profileId
        selected_template
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSkills = /* GraphQL */ `
  query ListSkills(
    $filter: ModelSkillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        experienceId
        id
        isRelevant
        openingId
        owner
        profileId
        technology
        updatedAt
        years_of_experience
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSocials = /* GraphQL */ `
  query ListSocials(
    $filter: ModelSocialFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSocials(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        owner
        profileId
        type
        updatedAt
        url
        __typename
      }
      nextToken
      __typename
    }
  }
`;
