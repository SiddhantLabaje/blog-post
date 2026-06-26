/**
 * Format an ISO date string to a human-readable format.
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format an ISO date string to a full date-time string.
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date-time
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate a string to a max length, appending ellipsis.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (str, maxLength = 60) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};
