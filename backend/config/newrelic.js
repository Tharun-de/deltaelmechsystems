'use strict';

/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['Delta Elmech Systems'],
  
  /**
   * Your New Relic license key.
   */
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  
  /**
   * This setting controls distributed tracing.
   * Distributed tracing lets you see the path that a request takes through your
   * distributed system.
   */
  distributed_tracing: {
    enabled: true
  },

  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: true,

  /**
   * Attributes are key-value pairs containing information that determines
   * the properties of an event or transaction.
   */
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations.
     * Allows * as wildcard at end.
     */
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  },

  /**
   * Transaction tracer configuration options.
   */
  transaction_tracer: {
    enabled: true,
    record_sql: 'obfuscated',
    explain_threshold: 200,
    top_n: 20
  },

  /**
   * Error collector configuration options.
   */
  error_collector: {
    enabled: true,
    ignore_status_codes: [404, 401, 403]
  },

  /**
   * Application logging configuration.
   */
  application_logging: {
    forwarding: {
      enabled: true,
      max_samples_stored: 10000
    }
  },

  /**
   * Browser monitoring configuration.
   */
  browser_monitoring: {
    enabled: true
  },

  /**
   * Transaction events configuration.
   */
  transaction_events: {
    enabled: true,
    max_samples_stored: 10000
  },

  logging: {
    enabled: true,
    level: 'info'
  }
}; 