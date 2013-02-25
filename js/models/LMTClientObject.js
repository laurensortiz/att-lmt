// models/LMTClientObject.js

define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal'],
function($, _, Backbone, Modal) {
	var LMTClientObject = Backbone.Model.extend({

		defaults: {
			'wirelessReceiver': "0",
			'wiredReceiver': "0",
			'tHomeDvr': false,
			'hDef': false,
			'hdPrem': false,
			'cvoipPlan': undefined,
			'hsiaPlan': undefined,
			'iptvPlan': undefined,
			'promotionCode': undefined,
			'secondVoipLine': false,
			'generaPkgGrp': [ ], // premium channels like HBO, STARZ
			'connecTechSelected': false,
			'channel-language': 'english',
			'channel-filters': '',
			'channel-package': ''
		},

		initialize: function() {
			this.bind('change', this.modelChanged);
		},

		login: function(credentials) {
			var lmtClient = this;
			this.modal = new Modal('modals-loading');
			if (credentials.method === 'phone') {
				$.getJSON('./js/json/success-triple.js', credentials, function(data, status) {
					lmtClient.setJSON(data);
					lmtClient.modal.destroy();
					location.href = "#/u-verse";
				});
			}
			if (credentials.method === 'address') {
				if (credentials.addr1 === 'multiple') {
					$.getJSON('./js/json/multipleAddresses.js', credentials, function(data, status) {
						lmtClient.modal.destroy();
						lmtClient.modal = new Modal('modals-multiple-addresses', data);
					});
				} else {
					$.getJSON('./js/json/success-triple.js', credentials, function(data, status) {
						customer.setJSON(data);
						lmtClient.modal.destroy();
						location.href = "#/u-verse";
					});
				}
			}
		},

		// prep json data
		setJSON: function(json) {
			var lmtClient = this;
			console.log('model received json: ', json);

			// customer & employee info
			this.set('agentInfo', json.agentInfo, {silent:true});
			this.set('customerInfo', json.customerInfo, {silent:true});
			// prep channels and their filters
			this.set('channelFilters', _.without(_.uniq(_.pluck(json.channels.channelLineup.channel, 'channelCategory')), "Private Access", ""), {silent:true});
			this.set('channels', _.sortBy(json.channels.channelLineup.channel, "channelName"), {silent:true});
			// bundles and their options
			this.setProducts(json.products);
			this.set('promotions', json.promotions, {silent:true});
			this.updateTotals();
			this.trigger('jsonUpdated');
		},

		setProducts: function(products) {
			_.each(products, function(product) {
				// VideoBasic
				if (product.componentCode === 'VideoBasic') {
					var wired = [],
						unwired = [];
					_(product.maxWiredReceivers).times(function(n) {
						var naturalInd = n + 1;
						wired[n] = { "value": naturalInd };
						if (naturalInd === product.wiredReceivers) {
							wired[n]['selected'] = true; }
					});
					_(product.maxWirelessReceivers).times(function(n) {
						var naturalInd = n + 1;
						unwired[n] = { "value": naturalInd };
						if (naturalInd === product.wirelessReceivers) {
							unwired[n]['selected'] = true; }
					});
					lmtClient.set('VideoBasic', product, {silent:true});
					if (wired.length>0) {
						lmtClient.set('wiredReceivers', wired, {silent:true}); }
					if (unwired.length>0) {
						lmtClient.set('wirelessReceivers', unwired, {silent:true}); }
					lmtClient.set('wiredReceiver', product.wiredReceivers, {silent:true});
					lmtClient.set('wirelessReceiver', product.wirelessReceivers, {silent:true});
					lmtClient.setVideoBasicOptions(product.attributeList)
					lmtClient.setExtraChannels(product.gpMap);
				}
				// HSIA
				if (product.componentCode === 'HSIA') {
					lmtClient.set('HSIA', product, {silent:true});
					_.each(product.attributeList, function(obj) {
						if (obj.attributeCode === 'Speed') {
							lmtClient.set('hsiaPlan', obj.selectedValidValueItemValue, {silent:true});
							lmtClient.set('hsiaPlanName', obj.attributeDisplayName, {silent:true});
						}
					});
				}
				// CVOIP
				if (product.componentCode === 'CVOIP') {
					lmtClient.set('CVOIP', product, {silent:true});
					_.each(product.attributeList, function(obj) {
						if (obj.attributeCode === 'usagePlan') {
							lmtClient.set('cvoipPlan', obj.selectedValidValueItemValue, {silent:true});
							lmtClient.set('cvoipPlanName', obj.attributeDisplayName, {silent:true});
						}
					});
				}
				// CHN
				if (product.componentCode === 'CHN') {
					lmtClient.set('CHN', product, {silent:true});
				}
			});
		},

		setExtraChannel: function(componentCode, value) {
			var selectedChannels = this.get('selectedChannels');
			var extraChannels = this.get('extraChannels');
			if (value === 'on') {
				var addedChannel = _.find(extraChannels.channelList, function(obj) {
					if (obj.componentCode === componentCode) {
						return true;
					} else {
						return false;
					}
				});
				selectedChannels = _.union(selectedChannels, [addedChannel]);
			} else {
				selectedChannels = _.reject(selectedChannels, function(el) { return el.componentCode === componentCode; })
			}
			this.set('selectedChannels', _(selectedChannels).sortBy('displayName'), {silent:true});
		},
		setExtraChannels: function(extras) {
			var selectedChannels = [],
					extraChannels = {};
			extraChannels['groups'] = [],
			extraChannels['channelList'] = [];
			_.each(_(extras).sortBy('displayName'), function(obj) {
				extraChannels.groups.push(obj.group);
				extraChannels.channelList.push(obj);
				if (obj.selected) {
					selectedChannels.push(obj);
				}
			});
			this.set('extraChannelGroups', _.uniq(extraChannels.groups), {silent:true});
			this.set('selectedChannels', selectedChannels, {silent:true});
			this.set('extraChannels', extraChannels, {silent:true});
		},
		setVideoBasicOptions: function(attributeList) {
			_.each(attributeList, function(obj) {
				if (obj.attributeCode === "availBasicPackage") {
					// lmtClient.set('iptvOptions', obj.validValueList, {silent:true});
					lmtClient.set('iptvPlan', obj.selectedValidValueItemValue, {silent:true});
					lmtClient.set('iptvPlanName', obj.attributeDisplayName, {silent:true}); }
				if (obj.attributeCode === "selectedDVRTier" && obj.selectedValidValueItemValue === "THDVR") {
					lmtClient.set('tHomeDvr', true, {silent:true}); }
				else {
					lmtClient.set('tHomeDvr', false, {silent:true}); }
				if (obj.attributeCode === "enableHighDefinition" && obj.selectedValidValueItemValue === "Allow") {
					lmtClient.set('hDef', true, {silent:true}); }
				else {
					lmtClient.set('hDef', false, {silent:true}); }
				if (obj.attributeCode === "HDPremium") { // correct attribute code??
					lmtClient.set('hdPrem', true, {silent:true}); }
				else {
					lmtClient.set('hdPrem', false, {silent:true}); }
			});
		},

		updateTotals: function() {
			var products = [
						this.get('VideoBasic'),
						this.get('HSIA'),
						this.get('CVOIP'),
						this.get('CHN') ],
					total = 0,
					oneTimeTotal = 0;
			_.each(products, function(value, key) {
				total += parseInt( value.total, 10);
				oneTimeTotal += parseInt( value.totalOneTimeCharges, 10);
				products[key].total = value.total.toFixed(2);
				products[key].totalOneTimeCharges = value.totalOneTimeCharges.toFixed(2);
			});
			this.set({
				total: total.toFixed(2),
				totalOneTimeCharges: oneTimeTotal.toFixed(2)
			}, {silent:true});
		},

		refreshPricing: function() {
			var args = {
				"wirelessReceiver": this.get('wirelessReceiver'),
				"wiredReceiver": this.get("wiredReceiver"),
				"tHomeDvr": this.get("tHomeDvr"),
				"hDef": this.get("hDef"),
				"hdPrem": this.get("hdPrem"),
				"cvoipPlan": this.get("cvoipPlan"),
				"hsiaPlan": this.get("hsiaPlan"),
				"iptvPlan": this.get("iptvPlan"),
				"promotionCode": this.get("promotionCode"),
				"secondVoipLine": this.get("secondVoipLine"),
				"generaPkgGrp": this.get("generaPkgGrp"),
				"connecTechSelected": this.get("connecTechSelected")
			},
			lmtClient = this;
			$.getJSON('./js/json/success-triple.js', args, function(data, status) {
				lmtClient.setJSON(data);
			});
		},

		modelChanged: function(lmtClient, changed) {
			// console.log('model changed: ', lmtClient, changed);
		}

	});

	var lmtClient = new LMTClientObject();
	return lmtClient;
});
