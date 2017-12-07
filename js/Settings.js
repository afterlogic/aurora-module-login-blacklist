'use strict';

var
	ko = require('knockout'),
	_ = require('underscore'),
	
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js')
;

module.exports = {
	ServerModuleName: 'LoginBlacklist',
	HashModuleName: 'loginBlacklist',
	
	CustomTabTitle: '',
	enableModule: ko.observable(true),
	PublicHash: '',
	
	bShowCommonSettings: true,
	bShowFilesApps: true,
    LoginBlackList: "",
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		var
			oAppDataFilesSection = oAppData[this.ServerModuleName],
			oAppDataFilesWebclientSection = oAppData['%ModuleName%']
		;
		
		if (!_.isEmpty(oAppDataFilesSection))
		{
			this.CustomTabTitle = Types.pString(oAppDataFilesSection.CustomTabTitle, this.CustomTabTitle);
			this.enableModule =  ko.observable(Types.pBool(oAppDataFilesSection.EnableModule, this.enableModule()));
			this.PublicHash = Types.pString(oAppDataFilesSection.PublicHash, this.PublicHash);
		}
			
		if (!_.isEmpty(oAppDataFilesWebclientSection))
		{
			this.bShowCommonSettings = Types.pBool(oAppDataFilesWebclientSection.ShowCommonSettings, this.bShowCommonSettings);
			this.bShowFilesApps = Types.pBool(oAppDataFilesWebclientSection.ShowFilesApps, this.bShowFilesApps);
		}
	},
	
	/**
	 * Updates new settings values after saving on server.
	 * 
	 * @param {string} sEnableModule
	 */
	update: function (sEnableModule)
	{
		this.enableModule(sEnableModule === '1');
	},
	
	/**
	 * Updates settings from settings tab in admin panel.
	 *
	 */
	updateAdmin: function ()
	{
	}
};
