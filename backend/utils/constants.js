const VALID_PROCESS_STATUSES = [
  'Submitted',
  'Under Review',
  'Home Visit Scheduled',
  'Meet-and-Greet',
  'Reference Checks',
  'Adoption Agreement',
  'Adoption Fee Payment',
  'Post-Adoption Support',
  'Follow-Up',
  'Community Engagement',
  'Rejected',
];

const USER_TYPES = {
  ADMIN: 'admin',
  USER: 'user',
};

module.exports = {
  VALID_PROCESS_STATUSES,
  USER_TYPES,
};