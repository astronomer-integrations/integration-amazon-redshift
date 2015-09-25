
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var AWS = require('aws-sdk');
var kinesis = new AWS.Kinesis({ region: "us-east-1" });

/**
 * Expose `AmazonRedshift`
 */

var AmazonRedshift = module.exports = integration('AmazonRedshift')
  .channels(['server'])
  .ensure('settings.streamName');

AmazonRedshift.prototype.invoke = function(payload, fn) {
  return kinesis.putRecord({
    StreamName: this.settings.streamName,
    PartitionKey: payload.field('appId'),
    Data: JSON.stringify(payload.json())
  }, fn);
};

/**
 * Track.
 *
 * @apram {Track} track
 * @param {Function} fn
 * @api private
 */

AmazonRedshift.prototype.track = function(payload, fn){
  return this.invoke(payload, fn);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 * @param {Function} fn
 * @api private
 */

AmazonRedshift.prototype.identify = function(payload, fn){
  return this.invoke(payload, fn);
};

/**
* Group.
*
* @param {Group} group
* @param {Function} fn
* @api private
*/

AmazonRedshift.prototype.group = function(payload, fn){
  return this.invoke(payload, fn);
};

/**
* Alias.
*
* @param {Alias} alias
* @param {Function} fn
* @api private
*/

AmazonRedshift.prototype.alias = function(payload, fn){
  return this.invoke(payload, fn);
};
