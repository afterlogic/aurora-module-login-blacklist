'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js'),
	
	ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
	CAbstractSettingsFormView = ModulesManager.run('AdminPanelWebclient', 'getAbstractSettingsFormViewClass'),
	
	Settings = require('modules/%ModuleName%/js/Settings.js')
;

/**
* @constructor
*/
function CLoginBlacklistAdminSettingsView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	/* Editable fields */
	this.blackList = ko.observable(Settings.LoginBlackList);
	/*-- Editable fields */
}

_.extendOwn(CLoginBlacklistAdminSettingsView.prototype, CAbstractSettingsFormView.prototype);

CLoginBlacklistAdminSettingsView.prototype.ViewTemplate = '%ModuleName%_LoginBlacklistAdminSettingsView';

CLoginBlacklistAdminSettingsView.prototype.getCurrentValues = function()
{
	return [
		this.blackList()
	];
};

CLoginBlacklistAdminSettingsView.prototype.revertGlobalValues = function()
{
	this.loginBlackList(Settings.LoginBlackList);
};

CLoginBlacklistAdminSettingsView.prototype.getParametersForSave = function ()
{
	return {
		'LoginBlackList': this.blackList()
	};
};

/**
 * Applies saved values to the Settings object.
 * 
 * @param {Object} oParameters Parameters which were saved on the server side.
 */
CLoginBlacklistAdminSettingsView.prototype.applySavedValues = function (oParameters)
{
	Settings.updateAdmin(oParameters.LoginBlackList);
};

/**
 * Sets access level for the view via entity type and entity identifier.
 * This view is visible only for empty entity type.
 * 
 * @param {string} sEntityType Current entity type.
 * @param {number} iEntityId Indentificator of current intity.
 */
CLoginBlacklistAdminSettingsView.prototype.setAccessLevel = function (sEntityType, iEntityId)
{
	this.visible(sEntityType === '');
};

module.exports = new CLoginBlacklistAdminSettingsView();
