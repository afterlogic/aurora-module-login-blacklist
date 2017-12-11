'use strict';

module.exports = function (oAppData) {

	var
		App = require('%PathToCoreWebclientModule%/js/App.js'),
		TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js'),
		Settings = require('modules/%ModuleName%/js/Settings.js'),
		bAdminUser = App.getUserRole() === Enums.UserRole.SuperAdmin;
	    Settings.init(oAppData);

    if (bAdminUser)
    {
        return {
            start: function (ModulesManager) {
                ModulesManager.run('AdminPanelWebclient', 'registerAdminPanelTab', [
                    function(resolve) {
                        require.ensure(
                            ['modules/%ModuleName%/js/views/LoginBlackListAdminSettingsView.js'],
                            function() {
                                resolve(require('modules/%ModuleName%/js/views/LoginBlackListAdminSettingsView.js'));
                            },
                            "admin-bundle"
                        );
                    },
                    Settings.HashModuleName,
                    TextUtils.i18n('%MODULENAME%/LABEL_SETTINGS_TAB')
                ]);
            }
        };
    }

	return null;
};
