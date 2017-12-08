'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
	CAbstractSettingsFormView = ModulesManager.run('AdminPanelWebclient', 'getAbstractSettingsFormViewClass'),
    Settings = require('modules/%ModuleName%/js/Settings.js'),
	Ajax = require('modules/%ModuleName%/js/Ajax.js'),
    Screens = require('%PathToCoreWebclientModule%/js/Screens.js'),
    TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js');

/**
* @constructor
*/
function CLoginBlackListAdminSettingsView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);
	
	/* Editable fields */
	this.blackList = ko.observable(Settings.LoginBlackList);
	/*-- Editable fields */
}

_.extendOwn(CLoginBlackListAdminSettingsView.prototype, CAbstractSettingsFormView.prototype);

CLoginBlackListAdminSettingsView.prototype.ViewTemplate = '%ModuleName%_LoginBlackListAdminSettingsView';


CLoginBlackListAdminSettingsView.prototype.save = function() {
    Ajax.send('SaveBlackList', {
        'BlackList' : this.blackList()
    }, this.onSaveBlackList, this);
};

CLoginBlackListAdminSettingsView.prototype.onSaveBlackList = function(oResponse) {
	if (oResponse.Result) {
        Screens.showReport(TextUtils.i18n('COREWEBCLIENT/REPORT_SETTINGS_UPDATE_SUCCESS'));
	} else {
        Screens.showError(TextUtils.i18n('COREWEBCLIENT/ERROR_SAVING_SETTINGS_FAILED'));
	}

}

module.exports = new CLoginBlackListAdminSettingsView();




