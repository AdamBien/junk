var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function (obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

var oToken = Object.create(null);
var fnMerge = function () {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && fnIsPlainObject(src) ? src : {};
                    }
                    target[name] = fnMerge(deep, arguments[1], clone, copy);
                } else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

var fnMerge$1 = function () {
    var args = [
        true,
        false
    ];
    args.push.apply(args, arguments);
    return fnMerge.apply(null, args);
};

const whenDOMReady = () => {
	return new Promise(resolve => {
		if (document.body) {
			resolve();
		} else {
			document.addEventListener("DOMContentLoaded", () => {
				resolve();
			});
		}
	});
};

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes = {}) => {
	const style = document.createElement("style");
	style.type = "text/css";

	Object.entries(attributes).forEach(pair => style.setAttribute(...pair));

	style.textContent = cssText;
	document.head.appendChild(style);
	return style;
};

const features = new Map();

const getFeature = name => {
	return features.get(name);
};

/**
 * CSS font face used for the texts provided by SAP.
 */

/* CDN Locations */
const font72RegularWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents`;
const font72RegularWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents`;

const font72RegularFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents`;
const font72RegularFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents`;

const font72BoldWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents`;
const font72BoldWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents`;

const font72BoldFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents`;
const font72BoldFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents`;

const fontFaceCSS = `
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 400;
		src: local("72"),
			url(${font72RegularWoff2}) format("woff2"),
			url(${font72RegularWoff}) format("woff");
	}
	
	@font-face {
		font-family: "72full";
		font-style: normal;
		font-weight: 400;
		src: local('72-full'),
			url(${font72RegularFullWoff2}) format("woff2"),
			url(${font72RegularFullWoff}) format("woff");
		
	}
	
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 700;
		src: local('72-Bold'),
			url(${font72BoldWoff2}) format("woff2"),
			url(${font72BoldWoff}) format("woff");
	}
	
	@font-face {
		font-family: "72full";
		font-style: normal;
		font-weight: 700;
		src: local('72-Bold-full'),
			url(${font72BoldFullWoff2}) format("woff2"),
			url(${font72BoldFullWoff}) format("woff");
	}
`;

const insertFontFace = () => {
	if (document.querySelector(`head>style[data-ui5-font-face]`)) {
		return;
	}

	// If OpenUI5 is found, let it set the font
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support && OpenUI5Support.isLoaded()) {
		return;
	}

	createStyleInHead(fontFaceCSS, { "data-ui5-font-face": "" });
};

const systemCSSVars = `
	:root {
		--_ui5_content_density:cozy;
	}
	
	[data-ui5-compact-size],
	.ui5-content-density-compact,
	.sapUiSizeCompact {
		--_ui5_content_density:compact;
	}
	
	[dir="rtl"] {
		--_ui5_dir:rtl;
	}
	
	[dir="ltr"] {
		--_ui5_dir:ltr;
	}
`;

const insertSystemCSSVars = () => {
	if (document.querySelector(`head>style[data-ui5-system-css-vars]`)) {
		return;
	}

	createStyleInHead(systemCSSVars, { "data-ui5-system-css-vars": "" });
};

const assetParameters = {"themes":{"default":"sap_fiori_3","all":["sap_fiori_3","sap_fiori_3_dark","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_fiori_3_hcb","sap_fiori_3_hcw"]},"languages":{"default":"en","all":["ar","bg","ca","cs","da","de","el","en","es","et","fi","fr","hi","hr","hu","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh_CN","zh_TW"]},"locales":{"default":"en","all":["ar","ar_EG","ar_SA","bg","ca","cs","da","de","de_AT","de_CH","el","el_CY","en","en_AU","en_GB","en_HK","en_IE","en_IN","en_NZ","en_PG","en_SG","en_ZA","es","es_AR","es_BO","es_CL","es_CO","es_MX","es_PE","es_UY","es_VE","et","fa","fi","fr","fr_BE","fr_CA","fr_CH","fr_LU","he","hi","hr","hu","id","it","it_CH","ja","kk","ko","lt","lv","ms","nb","nl","nl_BE","pl","pt","pt_PT","ro","ru","ru_UA","sk","sl","sr","sv","th","tr","uk","vi","zh_CN","zh_HK","zh_SG","zh_TW"]}};

const DEFAULT_THEME = assetParameters.themes.default;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
const SUPPORTED_LOCALES = assetParameters.locales.all;

let initialized = false;

let initialConfig = {
	animationMode: "full",
	theme: DEFAULT_THEME,
	rtl: null,
	language: null,
	calendarType: null,
	noConflict: false, // no URL
	formatSettings: {},
};

const getTheme = () => {
	initConfiguration();
	return initialConfig.theme;
};

const getRTL = () => {
	initConfiguration();
	return initialConfig.rtl;
};

const getLanguage = () => {
	initConfiguration();
	return initialConfig.language;
};

const getNoConflict = () => {
	initConfiguration();
	return initialConfig.noConflict;
};

const getCalendarType = () => {
	initConfiguration();
	return initialConfig.calendarType;
};

const getFormatSettings = () => {
	initConfiguration();
	return initialConfig.formatSettings;
};

const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);

const parseConfigurationScript = () => {
	const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

	let configJSON;

	if (configScript) {
		try {
			configJSON = JSON.parse(configScript.innerHTML);
		} catch (err) {
			console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
		}

		if (configJSON) {
			initialConfig = fnMerge$1(initialConfig, configJSON);
		}
	}
};

const parseURLParameters = () => {
	const params = new URLSearchParams(window.location.search);

	params.forEach((value, key) => {
		if (!key.startsWith("sap-ui")) {
			return;
		}

		const lowerCaseValue = value.toLowerCase();

		const param = key.split("sap-ui-")[1];

		if (booleanMapping.has(value)) {
			value = booleanMapping.get(lowerCaseValue);
		}

		initialConfig[param] = value;
	});
};

const applyOpenUI5Configuration = () => {
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
		return;
	}

	const OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
	initialConfig = fnMerge$1(initialConfig, OpenUI5Config);
};


const initConfiguration = () => {
	if (initialized) {
		return;
	}

	// 1. Lowest priority - configuration script
	parseConfigurationScript();

	// 2. URL parameters overwrite configuration script parameters
	parseURLParameters();

	// 3. If OpenUI5 is detected, it has the highest priority
	applyOpenUI5Configuration();

	initialized = true;
};

const fetchPromises = new Map();
const jsonPromises = new Map();
const textPromises = new Map();

const fetchTextOnce = async url => {
	if (!fetchPromises.get(url)) {
		fetchPromises.set(url, fetch(url));
	}
	const response = await fetchPromises.get(url);

	if (!textPromises.get(url)) {
		textPromises.set(url, response.text());
	}

	return textPromises.get(url);
};

const fetchJsonOnce = async url => {
	if (!fetchPromises.get(url)) {
		fetchPromises.set(url, fetch(url));
	}
	const response = await fetchPromises.get(url);

	if (!jsonPromises.get(url)) {
		jsonPromises.set(url, response.json());
	}

	return jsonPromises.get(url);
};

/**
 * ""                        -> ""
 * "noExtension"             -> ""
 * "file.txt"                -> ".txt"
 * "file.with.many.dots.doc" -> ".doc"
 * ".gitignore"              -> ""
 *
 * @param fileName - the file name
 * @returns {string}
 */
const getFileExtension = fileName => {
	const dotPos = fileName.lastIndexOf(".");

	if (dotPos < 1) {
		return "";
	}

	return fileName.slice(dotPos);
};

const themeURLs = new Map();
const themeStyles = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();

/**
 * Used to provide CSS Vars for a specific theme for a specific package.
 * The CSS Vars can be passed directly as a string (containing them), as an object with a "_" property(containing them in the "_" property), or as a URL.
 * This URL must point to a JSON file, containing a "_" property.
 *
 * Example usage:
 *  1) Pass the CSS Vars as a string directly.
 *  registerThemeProperties("my-package", "my_theme", ":root{--var1: red;}");
 *  2) Pass the CSS Vars as an object directly
 *  registerThemeProperties("my-package", "my_theme", {"_": ":root{--var1: red;}"});
 *  3) Pass a URL to a CSS file, containing the CSS Vars. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.css");
 *  4) Pass a URL to a JSON file, containing the CSS Vars in its "_" property. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.json");
 *
 * @public
 * @param packageName - the NPM package for which CSS Vars are registered
 * @param themeName - the theme which the CSS Vars implement
 * @param style - can be one of four options: a string, an object with a "_" property, URL to a CSS file, or URL to a JSON file with a "_" property
 */
const registerThemeProperties = (packageName, themeName, style) => {
	if (style._) {
		// JSON object like ({"_": ":root"})
		themeStyles.set(`${packageName}_${themeName}`, style._);
	} else if (style.includes(":root") || style === "") {
		// pure string, including empty string
		themeStyles.set(`${packageName}_${themeName}`, style);
	} else {
		// url for fetching
		themeURLs.set(`${packageName}_${themeName}`, style);
	}
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
};

const getThemeProperties = async (packageName, themeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style !== undefined) { // it's valid for style to be an empty string
		return style;
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return themeStyles.get(`${packageName}_${DEFAULT_THEME}`);
	}

	const data = await fetchThemeProperties(packageName, themeName);
	const themeProps = data._ || data;

	themeStyles.set(`${packageName}_${themeName}`, themeProps);
	return themeProps;
};

const fetchThemeProperties = async (packageName, themeName) => {
	const url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import the ${packageName}/dist/Assets.js module to switch to additional themes`);
	}

	return getFileExtension(url) === ".css" ? fetchTextOnce(url) : fetchJsonOnce(url);
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

const isThemeRegistered = theme => {
	return registeredThemes.has(theme);
};

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 * @param packageName
 */
const createThemePropertiesStyleTag = (cssText, packageName) => {
	const styleElement = document.head.querySelector(`style[data-ui5-theme-properties="${packageName}"]`);
	if (styleElement) {
		styleElement.textContent = cssText || "";	// in case of undefined
	} else {
		const attributes = {
			"data-ui5-theme-properties": packageName,
		};
		createStyleInHead(cssText, attributes);
	}
};

const getThemeMetadata = () => {
	// Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
	let el = document.querySelector(".sapThemeMetaData-Base-baseLib");
	if (el) {
		return getComputedStyle(el).backgroundImage;
	}

	el = document.createElement("span");
	el.style.display = "none";
	el.classList.add("sapThemeMetaData-Base-baseLib");
	document.body.appendChild(el);
	const metadata = getComputedStyle(el).backgroundImage;
	document.body.removeChild(el);

	return metadata;
};

const parseThemeMetadata = metadataString => {
	const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);
	if (params && params.length >= 2) {
		let paramsString = params[1];
		paramsString = paramsString.replace(/\\"/g, `"`);
		if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
			try {
				paramsString = decodeURIComponent(paramsString);
			} catch (ex) {
				console.warn("Malformed theme metadata string, unable to decodeURIComponent"); // eslint-disable-line
				return;
			}
		}
		try {
			return JSON.parse(paramsString);
		} catch (ex) {
			console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
		}
	}
};

const processThemeMetadata = metadata => {
	let themeName;
	let baseThemeName;

	try {
		themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
		baseThemeName = metadata.Extends[0];
	} catch (ex) {
		console.warn("Malformed theme metadata Object", metadata); // eslint-disable-line
		return;
	}

	return {
		themeName,
		baseThemeName,
	};
};

const getThemeDesignerTheme = () => {
	const metadataString = getThemeMetadata();
	if (!metadataString || metadataString === "none") {
		return;
	}

	const metadata = parseThemeMetadata(metadataString);
	return processThemeMetadata(metadata);
};

let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
	ponyfillTimer = undefined;

	window.CSSVarsPonyfill.cssVars({
		rootElement: document.head,
		silent: true,
	});
};

const schedulePonyfill = () => {
	if (!ponyfillTimer) {
		ponyfillTimer = window.setTimeout(runPonyfill, 0);
	}
};

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theme-base";

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async theme => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	const cssText = await getThemeProperties(BASE_THEME_PACKAGE, theme);
	createThemePropertiesStyleTag(cssText, BASE_THEME_PACKAGE);
};

const deleteThemeBase = () => {
	const styleElement = document.head.querySelector(`style[data-ui5-theme-properties="${BASE_THEME_PACKAGE}"]`);
	if (styleElement) {
		styleElement.parentElement.removeChild(styleElement);
	}
};

const loadComponentPackages = async theme => {
	const registeredPackages = getRegisteredPackages();
	registeredPackages.forEach(async packageName => {
		if (packageName === BASE_THEME_PACKAGE) {
			return;
		}

		const cssText = await getThemeProperties(packageName, theme);
		createThemePropertiesStyleTag(cssText, packageName);
	});
};

const detectExternalTheme = () => {
	// If theme designer theme is detected, use this
	const extTheme = getThemeDesignerTheme();
	if (extTheme) {
		return extTheme;
	}

	// If OpenUI5Support is enabled, try to find out if it loaded variables
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support) {
		const varsLoaded = OpenUI5Support.cssVariablesLoaded();
		if (varsLoaded) {
			return {
				themeName: OpenUI5Support.getConfigurationSettingsObject().theme, // just themeName, baseThemeName is only relevant for custom themes
			};
		}
	}
};

const applyTheme = async theme => {
	const extTheme = detectExternalTheme();

	// Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded
	if (!extTheme || theme !== extTheme.themeName) {
		await loadThemeBase(theme);
	} else {
		deleteThemeBase();
	}

	// Always load component packages properties. For non-registered themes, try with the base theme, if any
	const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
	await loadComponentPackages(packagesTheme);

	// When changing the theme, run the ponyfill immediately
	if (ponyfillNeeded()) {
		runPonyfill();
	}
};

let theme;

const getTheme$1 = () => {
	if (theme === undefined) {
		theme = getTheme();
	}

	return theme;
};

let polyfillLoadedPromise;

const whenPolyfillLoaded = () => {
	if (polyfillLoadedPromise) {
		return polyfillLoadedPromise;
	}

	polyfillLoadedPromise = new Promise(resolve => {
		if (window.WebComponents
			&& !window.WebComponents.ready
			&& window.WebComponents.waitFor) {
			// the polyfill loader is present
			window.WebComponents.waitFor(() => {
				// the polyfills are loaded, safe to execute code depending on their APIs
				resolve();
			});
		} else {
			// polyfill loader missing, modern browsers only
			resolve();
		}
	});

	return polyfillLoadedPromise;
};

let bootPromise;

const boot = () => {
	if (bootPromise) {
		return bootPromise;
	}

	bootPromise = new Promise(async resolve => {
		const OpenUI5Support = getFeature("OpenUI5Support");
		if (OpenUI5Support) {
			await OpenUI5Support.init();
		}

		await whenDOMReady();
		await applyTheme(getTheme$1());
		OpenUI5Support && OpenUI5Support.attachListeners();
		insertFontFace();
		insertSystemCSSVars();
		await whenPolyfillLoaded();
		resolve();
	});

	return bootPromise;
};

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.DataType
 * @public
 */
class DataType {
	static isValid(value) {
	}

	static generataTypeAcessors(types) {
		Object.keys(types).forEach(type => {
			Object.defineProperty(this, type, {
				get() {
					return types[type];
				},
			});
		});
	}
}

const isDescendantOf = (klass, baseKlass, inclusive = false) => {
	if (typeof klass !== "function" || typeof baseKlass !== "function") {
		return false;
	}
	if (inclusive && klass === baseKlass) {
		return true;
	}
	let parent = klass;
	do {
		parent = Object.getPrototypeOf(parent);
	} while (parent !== null && parent !== baseKlass);
	return parent === baseKlass;
};

const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();

const kebabToCamelCase = string => {
	if (!kebabToCamelMap.has(string)) {
		const result = toCamelCase(string.split("-"));
		kebabToCamelMap.set(string, result);
	}
	return kebabToCamelMap.get(string);
};

const camelToKebabCase = string => {
	if (!camelToKebabMap.has(string)) {
		const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		camelToKebabMap.set(string, result);
	}
	return camelToKebabMap.get(string);
};

const toCamelCase = parts => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};

const isSlot = el => el && el instanceof HTMLElement && el.localName === "slot";

/**
 *
 * @class
 * @public
 */
class UI5ElementMetadata {
	constructor(metadata) {
		this.metadata = metadata;
	}

	/**
	 * Only intended for use by UI5Element.js
	 * @protected
	 */
	static validatePropertyValue(value, propData) {
		const isMultiple = propData.multiple;
		if (isMultiple) {
			return value.map(propValue => validateSingleProperty(propValue, propData));
		}
		return validateSingleProperty(value, propData);
	}

	/**
	 * Only intended for use by UI5Element.js
	 * @protected
	 */
	static validateSlotValue(value, slotData) {
		return validateSingleSlot(value, slotData);
	}

	/**
	 * Returns the tag of the UI5 Element
	 * @public
	 */
	getTag() {
		return this.metadata.tag;
	}

	/**
	 * Used to get the tag we need to register for backwards compatibility
	 * @public
	 */
	getAltTag() {
		return this.metadata.altTag;
	}

	/**
	 * Determines whether a property should have an attribute counterpart
	 * @public
	 * @param propName
	 * @returns {boolean}
	 */
	hasAttribute(propName) {
		const propData = this.getProperties()[propName];
		return propData.type !== Object && !propData.noAttribute;
	}

	/**
	 * Returns an array with the properties of the UI5 Element (in camelCase)
	 * @public
	 * @returns {string[]}
	 */
	getPropertiesList() {
		return Object.keys(this.getProperties());
	}

	/**
	 * Returns an array with the attributes of the UI5 Element (in kebab-case)
	 * @public
	 * @returns {string[]}
	 */
	getAttributesList() {
		return this.getPropertiesList().filter(this.hasAttribute, this).map(camelToKebabCase);
	}

	/**
	 * Returns an object with key-value pairs of slots and their metadata definitions
	 * @public
	 */
	getSlots() {
		return this.metadata.slots || {};
	}

	/**
	 * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
	 * @returns {boolean}
	 */
	canSlotText() {
		const defaultSlot = this.getSlots().default;
		return defaultSlot && defaultSlot.type === Node;
	}

	/**
	 * Determines whether this UI5 Element supports any slots
	 * @public
	 */
	hasSlots() {
		return !!Object.entries(this.getSlots()).length;
	}

	/**
	 * Determines whether this UI5 Element supports any slots with "individualSlots: true"
	 * @public
	 */
	hasIndividualSlots() {
		return this.slotsAreManaged() && Object.entries(this.getSlots()).some(([_slotName, slotData]) => slotData.individualSlots);
	}

	/**
	 * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
	 * @public
	 */
	slotsAreManaged() {
		return !!this.metadata.managedSlots;
	}

	/**
	 * Returns an object with key-value pairs of properties and their metadata definitions
	 * @public
	 */
	getProperties() {
		return this.metadata.properties || {};
	}

	/**
	 * Returns an object with key-value pairs of events and their metadata definitions
	 * @public
	 */
	getEvents() {
		return this.metadata.events || {};
	}

	/**
	 * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
	 * @returns {boolean}
	 */
	isLanguageAware() {
		return !!this.metadata.languageAware;
	}
}

const validateSingleProperty = (value, propData) => {
	const propertyType = propData.type;

	if (propertyType === Boolean) {
		return typeof value === "boolean" ? value : false;
	}
	if (propertyType === String) {
		return (typeof value === "string" || typeof value === "undefined" || value === null) ? value : value.toString();
	}
	if (propertyType === Object) {
		return typeof value === "object" ? value : propData.defaultValue;
	}
	if (isDescendantOf(propertyType, DataType)) {
		return propertyType.isValid(value) ? value : propData.defaultValue;
	}
};

const validateSingleSlot = (value, slotData) => {
	if (value === null) {
		return value;
	}

	const getSlottedNodes = el => {
		if (isSlot(el)) {
			return el.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
		}

		return [el];
	};

	const slottedNodes = getSlottedNodes(value);
	slottedNodes.forEach(el => {
		if (!(el instanceof slotData.type)) {
			throw new Error(`${el} is not of type ${slotData.type}`);
		}
	});

	return value;
};

const getSingletonElementInstance = (tag, parentElement = document.body) => {
	let el = document.querySelector(tag);

	if (el) {
		return el;
	}

	el = document.createElement(tag);

	return parentElement.insertBefore(el, parentElement.firstChild);
};

const getStaticAreaInstance = () => getSingletonElementInstance("ui5-static-area");

const removeStaticArea = () => {
	getStaticAreaInstance().destroy();
};

class StaticAreaElement extends HTMLElement {
	constructor() {
		super();
	}

	get isUI5Element() {
		return true;
	}

	destroy() {
		const staticAreaDomRef = document.querySelector(this.tagName.toLowerCase());
		staticAreaDomRef.parentElement.removeChild(staticAreaDomRef);
	}
}

if (!customElements.get("ui5-static-area")) {
	customElements.define("ui5-static-area", StaticAreaElement);
}

const MAX_PROCESS_COUNT = 10;

class RenderQueue {
	constructor() {
		this.list = []; // Used to store the web components in order
		this.lookup = new Set(); // Used for faster search
	}

	add(webComponent) {
		if (this.lookup.has(webComponent)) {
			return;
		}

		this.list.push(webComponent);
		this.lookup.add(webComponent);
	}

	remove(webComponent) {
		if (!this.lookup.has(webComponent)) {
			return;
		}

		this.list = this.list.filter(item => item !== webComponent);
		this.lookup.delete(webComponent);
	}

	shift() {
		const webComponent = this.list.shift();
		if (webComponent) {
			this.lookup.delete(webComponent);
			return webComponent;
		}
	}

	isEmpty() {
		return this.list.length === 0;
	}

	isAdded(webComponent) {
		return this.lookup.has(webComponent);
	}

	/**
	 * Processes the whole queue by executing the callback on each component,
	 * while also imposing restrictions on how many times a component may be processed.
	 *
	 * @param callback - function with one argument (the web component to be processed)
	 */
	process(callback) {
		let webComponent;
		const stats = new Map();

		webComponent = this.shift();
		while (webComponent) {
			const timesProcessed = stats.get(webComponent) || 0;
			if (timesProcessed > MAX_PROCESS_COUNT) {
				throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
			}
			callback(webComponent);
			stats.set(webComponent, timesProcessed + 1);
			webComponent = this.shift();
		}
	}
}

// This is needed as IE11 doesn't have Set.prototype.keys/values/entries, so [...mySet.values()] is not an option
const setToArray = s => {
	const arr = [];
	s.forEach(item => {
		arr.push(item);
	});
	return arr;
};

const Definitions = new Set();
const Failures = new Set();
let failureTimeout;

const registerTag = tag => {
	Definitions.add(tag);
};

const isTagRegistered = tag => {
	return Definitions.has(tag);
};

const getAllRegisteredTags = () => {
	return setToArray(Definitions);
};

const recordTagRegistrationFailure = tag => {
	Failures.add(tag);
	if (!failureTimeout) {
		failureTimeout = setTimeout(() => {
			displayFailedRegistrations();
			failureTimeout = undefined;
		}, 1000);
	}
};

const displayFailedRegistrations = () => {
	console.warn(`The following tags have already been defined by a different UI5 Web Components version: ${setToArray(Failures).join(", ")}`); // eslint-disable-line
	Failures.clear();
};

const rtlAwareSet = new Set();

const markAsRtlAware = klass => {
	rtlAwareSet.add(klass);
};

const isRtlAware = klass => {
	return rtlAwareSet.has(klass);
};

const registeredElements = new Set();

// Queue for invalidated web components
const invalidatedWebComponents = new RenderQueue();

let renderTaskPromise,
	renderTaskPromiseResolve;

let mutationObserverTimer;

let queuePromise;

/**
 * Class that manages the rendering/re-rendering of web components
 * This is always asynchronous
 */
class RenderScheduler {
	constructor() {
		throw new Error("Static class");
	}

	/**
	 * Schedules a render task (if not already scheduled) to render the component
	 *
	 * @param webComponent
	 * @returns {Promise}
	 */
	static async renderDeferred(webComponent) {
		// Enqueue the web component
		invalidatedWebComponents.add(webComponent);

		// Schedule a rendering task
		await RenderScheduler.scheduleRenderTask();
	}

	/**
	 * Renders a component synchronously
	 *
	 * @param webComponent
	 */
	static renderImmediately(webComponent) {
		webComponent._render();
	}

	/**
	 * Cancels the rendering of a component, added to the queue with renderDeferred
	 *
	 * @param webComponent
	 */
	static cancelRender(webComponent) {
		invalidatedWebComponents.remove(webComponent);
	}

	/**
	 * Schedules a rendering task, if not scheduled already
	 */
	static async scheduleRenderTask() {
		if (!queuePromise) {
			queuePromise = new Promise(resolve => {
				window.requestAnimationFrame(() => {
					// Render all components in the queue
					invalidatedWebComponents.process(component => component._render());

					// Resolve the promise so that callers of renderDeferred can continue
					queuePromise = null;
					resolve();

					// Wait for Mutation observer before the render task is considered finished
					if (!mutationObserverTimer) {
						mutationObserverTimer = setTimeout(() => {
							mutationObserverTimer = undefined;
							if (invalidatedWebComponents.isEmpty()) {
								RenderScheduler._resolveTaskPromise();
							}
						}, 200);
					}
				});
			});
		}

		await queuePromise;
	}

	/**
	 * return a promise that will be resolved once all invalidated web components are rendered
	 */
	static whenDOMUpdated() {
		if (renderTaskPromise) {
			return renderTaskPromise;
		}

		renderTaskPromise = new Promise(resolve => {
			renderTaskPromiseResolve = resolve;
			window.requestAnimationFrame(() => {
				if (invalidatedWebComponents.isEmpty()) {
					renderTaskPromise = undefined;
					resolve();
				}
			});
		});

		return renderTaskPromise;
	}

	static whenAllCustomElementsAreDefined() {
		const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
		return Promise.all(definedPromises);
	}

	static async whenFinished() {
		await RenderScheduler.whenAllCustomElementsAreDefined();
		await RenderScheduler.whenDOMUpdated();
	}

	static _resolveTaskPromise() {
		if (!invalidatedWebComponents.isEmpty()) {
			// More updates are pending. Resolve will be called again
			return;
		}

		if (renderTaskPromiseResolve) {
			renderTaskPromiseResolve.call(this);
			renderTaskPromiseResolve = undefined;
			renderTaskPromise = undefined;
		}
	}

	static register(element) {
		registeredElements.add(element);
	}

	static deregister(element) {
		registeredElements.delete(element);
	}

	/**
	 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
	 *
	 * Usage:
	 * reRenderAllUI5Elements() -> rerenders all components
	 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
	 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
	 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
	 *
	 * @public
	 * @param {Object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
	 */
	static reRenderAllUI5Elements(filters) {
		registeredElements.forEach(element => {
			const rtlAware = isRtlAware(element.constructor);
			const languageAware = element.constructor.getMetadata().isLanguageAware();
			if (!filters || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware)) {
				RenderScheduler.renderDeferred(element);
			}
		});
	}
}

/**
 * @class
 * @author SAP SE
 * @private
 * Defines and takes care of ui5-static-are-item items
 */
class StaticAreaItem {
	constructor(_ui5ElementContext) {
		this.ui5ElementContext = _ui5ElementContext;
		this._rendered = false;
	}

	isRendered() {
		return this._rendered;
	}

	/**
	 * @protected
	 */
	_updateFragment() {
		const renderResult = this.ui5ElementContext.constructor.staticAreaTemplate(this.ui5ElementContext),
			stylesToAdd = window.ShadyDOM ? false : this.ui5ElementContext.constructor.staticAreaStyles;

		if (!this.staticAreaItemDomRef) {
			// Initial rendering of fragment

			this.staticAreaItemDomRef = document.createElement("ui5-static-area-item");
			this.staticAreaItemDomRef.attachShadow({ mode: "open" });
			this.staticAreaItemDomRef.classList.add(this.ui5ElementContext._id); // used for getting the popover in the tests

			getStaticAreaInstance().appendChild(this.staticAreaItemDomRef);
			this._rendered = true;
		}

		this.ui5ElementContext.constructor.render(renderResult, this.staticAreaItemDomRef.shadowRoot, stylesToAdd, { eventContext: this.ui5ElementContext });
	}

	/**
	 * @protected
	 */
	_removeFragmentFromStaticArea() {
		if (!this.staticAreaItemDomRef) {
			return;
		}

		const staticArea = getStaticAreaInstance();

		staticArea.removeChild(this.staticAreaItemDomRef);

		this.staticAreaItemDomRef = null;

		// remove static area
		if (staticArea.childElementCount < 1) {
			removeStaticArea();
		}
	}

	/**
	 * @protected
	 */
	_updateContentDensity(isCompact) {
		if (!this.staticAreaItemDomRef) {
			return;
		}

		if (isCompact) {
			this.staticAreaItemDomRef.classList.add("sapUiSizeCompact");
			this.staticAreaItemDomRef.classList.add("ui5-content-density-compact");
		} else {
			this.staticAreaItemDomRef.classList.remove("sapUiSizeCompact");
			this.staticAreaItemDomRef.classList.remove("ui5-content-density-compact");
		}
	}

	/**
	 * @protected
	 * Returns reference to the DOM element where the current fragment is added.
	 */
	async getDomRef() {
		if (!this._rendered || !this.staticAreaItemDomRef) {
			this._updateFragment();
		}
		await RenderScheduler.whenDOMUpdated(); // Wait for the content of the ui5-static-area-item to be rendered
		return this.staticAreaItemDomRef.shadowRoot;
	}
}

class StaticAreaItemElement extends HTMLElement {
	constructor() {
		super();
	}

	get isUI5Element() {
		return true;
	}
}

if (!customElements.get("ui5-static-area-item")) {
	customElements.define("ui5-static-area-item", StaticAreaItemElement);
}

// Shorthands
const w = window;

// Map of observer objects per dom node
const observers = new WeakMap();

/**
 * Implements universal DOM node observation methods.
 */
class DOMObserver {
	constructor() {
		throw new Error("Static class");
	}

	/**
	 * This function abstracts out mutation observer usage inside shadow DOM.
	 * For native shadow DOM the native mutation observer is used.
	 * When the polyfill is used, the observeChildren ShadyDOM method is used instead.
	 *
	 * @throws Exception
	 * Note: does not allow several mutation observers per node. If there is a valid use-case, this behavior can be changed.
	 *
	 * @param node
	 * @param callback
	 * @param options - Only used for the native mutation observer
	 */
	static observeDOMNode(node, callback, options) {
		let observerObject = observers.get(node);
		if (observerObject) {
			throw new Error("A mutation/ShadyDOM observer is already assigned to this node.");
		}

		if (w.ShadyDOM) {
			observerObject = w.ShadyDOM.observeChildren(node, callback);
		} else {
			observerObject = new MutationObserver(callback);
			observerObject.observe(node, options);
		}

		observers.set(node, observerObject);
	}

	/**
	 * De-registers the mutation observer, depending on its type
	 * @param node
	 */
	static unobserveDOMNode(node) {
		const observerObject = observers.get(node);
		if (!observerObject) {
			return;
		}

		if (observerObject instanceof MutationObserver) {
			observerObject.disconnect();
		} else {
			w.ShadyDOM.unobserveChildren(observerObject);
		}
		observers.delete(node);
	}
}

// Fire these events even with noConflict: true
const excludeList = [
	"value-changed",
];

const shouldFireOriginalEvent = eventName => {
	return excludeList.includes(eventName);
};

let noConflict;

const shouldNotFireOriginalEvent = eventName => {
	const nc = getNoConflict$1();
	return !(nc.events && nc.events.includes && nc.events.includes(eventName));
};

const getNoConflict$1 = () => {
	if (noConflict === undefined) {
		noConflict = getNoConflict();
	}

	return noConflict;
};

const skipOriginalEvent = eventName => {
	const nc = getNoConflict$1();

	// Always fire these events
	if (shouldFireOriginalEvent(eventName)) {
		return false;
	}

	// Read from the configuration
	if (nc === true) {
		return true;
	}

	return !shouldNotFireOriginalEvent(eventName);
};

class EventProvider {
	constructor() {
		this._eventRegistry = {};
	}

	attachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry[eventName];

		if (!Array.isArray(eventListeners)) {
			eventRegistry[eventName] = [];
			eventListeners = eventRegistry[eventName];
		}

		eventListeners.push({
			"function": fnFunction,
		});
	}

	detachEvent(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		let eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return;
		}

		eventListeners = eventListeners.filter(event => {
			return event["function"] !== fnFunction; // eslint-disable-line
		});

		if (eventListeners.length === 0) {
			delete eventRegistry[eventName];
		}
	}

	/**
	 * Fires an event and returns the results of all event listeners as an array.
	 * Example: If listeners return promises, you can: await fireEvent("myEvent") to know when all listeners have finished.
	 *
	 * @param eventName the event to fire
	 * @param data optional data to pass to each event listener
	 * @returns {Array} an array with the results of all event listeners
	 */
	fireEvent(eventName, data) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return [];
		}

		return eventListeners.map(event => {
			return event["function"].call(this, data); // eslint-disable-line
		});
	}

	isHandlerAttached(eventName, fnFunction) {
		const eventRegistry = this._eventRegistry;
		const eventListeners = eventRegistry[eventName];

		if (!eventListeners) {
			return false;
		}

		for (let i = 0; i < eventListeners.length; i++) {
			const event = eventListeners[i];
			if (event["function"] === fnFunction) { // eslint-disable-line
				return true;
			}
		}

		return false;
	}

	hasListeners(eventName) {
		return !!this._eventRegistry[eventName];
	}
}

const eventProvider = new EventProvider();
const LANG_CHANGE = "languageChange";

const attachLanguageChange = listener => {
	eventProvider.attachEvent(LANG_CHANGE, listener);
};

let language;

/**
 * Returns the currently configured language, or the browser language as a fallback
 * @returns {String}
 */
const getLanguage$1 = () => {
	if (language === undefined) {
		language = getLanguage();
	}
	return language;
};

var getDesigntimePropertyAsArray = value => {
	const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
	return m && m[2] ? m[2].split(/,/) : null;
};

var detectNavigatorLanguage = () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;

	return rawLocale || DEFAULT_LANGUAGE;
};

const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
	"sh": "sr",
};

const A_RTL_LOCALES = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];

const impliesRTL = language => {
	language = (language && M_ISO639_OLD_TO_NEW[language]) || language;

	return A_RTL_LOCALES.indexOf(language) >= 0;
};

const getRTL$1 = () => {
	const configurationRTL = getRTL();

	if (configurationRTL !== null) {
		return !!configurationRTL;
	}

	return impliesRTL(getLanguage$1() || detectNavigatorLanguage());
};

const customCSSFor = {};

const getCustomCSS = tag => {
	return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

const getEffectiveStyle = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();
	const customStyle = getCustomCSS(tag) || "";
	let componentStyles = ElementClass.styles;

	if (Array.isArray(componentStyles)) {
		componentStyles = componentStyles.join(" ");
	}
	return `${componentStyles} ${customStyle}`;
};

const constructableStyleMap = new Map();

/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = ElementClass => {
	const tagName = ElementClass.getMetadata().getTag();
	const styleContent = getEffectiveStyle(ElementClass);
	if (constructableStyleMap.has(tagName)) {
		return constructableStyleMap.get(tagName);
	}

	const style = new CSSStyleSheet();
	style.replaceSync(styleContent);

	constructableStyleMap.set(tagName, style);
	return style;
};

const findClosingParenthesisPos = (str, openingParenthesisPos) => {
	let opened = 1;
	for (let pos = openingParenthesisPos + 1; pos < str.length; pos++) {
		const char = str.charAt(pos);
		if (char === "(") {
			opened++;
		} else if (char === ")") {
			opened--;
		}
		if (opened === 0) {
			return pos;
		}
	}
};

const replaceSelector = (str, selector, selectorStartPos, replacement) => {
	const charAfterSelectorPos = selectorStartPos + selector.length;
	const charAfterSelector = str.charAt(charAfterSelectorPos);

	const upToSelector = str.substring(0, selectorStartPos) + replacement;
	if (charAfterSelector === "(") {
		const closingParenthesisPos = findClosingParenthesisPos(str, charAfterSelectorPos);
		return upToSelector + str.substring(charAfterSelectorPos + 1, closingParenthesisPos) + str.substring(closingParenthesisPos + 1);
	}

	return upToSelector + str.substring(charAfterSelectorPos);
};

/**
 * :host => ui5-button
 * :host([expr]) => ui5-button[expr]
 * ::slotted(expr) => expr
 * @param str - source string
 * @param selector - :host or ::slotted
 * @param replacement - normally tag name
 * @returns {*}
 */
const replaceSelectors = (str, selector, replacement) => {
	let selectorStartPos = str.indexOf(selector);
	while (selectorStartPos !== -1) {
		str = replaceSelector(str, selector, selectorStartPos, replacement);
		selectorStartPos = str.indexOf(selector);
	}
	return str;
};

const adaptLinePart = (line, tag) => {
	line = line.trim();
	line = replaceSelectors(line, "::slotted", ``); // first remove all ::slotted() occurrences

	// Host selector - replace it
	if (line.startsWith(":host")) {
		return replaceSelector(line, ":host", 0, tag);
	}

	// Leave out @keyframes and keyframe values (0%, 100%, etc...)
	// csso shortens '100%' -> 'to', make sure to leave it untouched
	if (line.match(/^[@0-9]/) || line === "to" || line === "to{") {
		return line;
	}

	// IE specific selector (directly written with the tag) - keep it
	if (line.match(new RegExp(`^${tag}[^a-zA-Z0-9-]`))) {
		return line;
	}

	// No host and no tag in the beginning of the selector - prepend the tag
	return `${tag} ${line}`;
};

const adaptCSSForIE = (str, tag) => {
	str = str.replace(/\n/g, ` `);
	str = str.replace(/([{}])/g, `$1\n`);
	let result = ``;
	const lines = str.split(`\n`);
	lines.forEach(line => {
		const mustProcess = line.match(/{$/); // Only work on lines that end on {, otherwise just append to result
		if (mustProcess) {
			const lineParts = line.split(",");
			const processedLineParts = lineParts.map(linePart => {
				return adaptLinePart(linePart, tag);
			});
			line = processedLineParts.join(",");
		}
		result = `${result}${line}`;
	});
	return result;
};

const IEStyleSet = new Set();

const getStaticStyle = ElementClass => {
	let componentStaticStyles = ElementClass.staticAreaStyles;
	if (Array.isArray(componentStaticStyles)) {
		componentStaticStyles = componentStaticStyles.join(" ");
	}

	return componentStaticStyles;
};

/**
 * Creates the needed CSS for a web component class in the head tag
 * Note: IE11, Edge
 * @param ElementClass
 */
const createComponentStyleTag = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();
	if (IEStyleSet.has(tag)) {
		return;
	}

	let cssContent = getEffectiveStyle(ElementClass);
	cssContent = adaptCSSForIE(cssContent, tag);

	// Append static CSS, if any, for IE
	let staticCssContent = getStaticStyle(ElementClass);
	if (staticCssContent) {
		staticCssContent = adaptCSSForIE(staticCssContent, "ui5-static-area-item");
		cssContent = `${cssContent} ${staticCssContent}`;
	}

	createStyleInHead(cssContent, {
		"data-ui5-element-styles": tag,
		"disabled": "disabled",
	});
	if (ponyfillNeeded()) {
		schedulePonyfill();
	}

	IEStyleSet.add(tag);
};

class Integer extends DataType {
	static isValid(value) {
		return Number.isInteger(value);
	}
}

class Float extends DataType {
	static isValid(value) {
		// Assuming that integers are floats as well!
		return Number(value) === value;
	}
}

// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as title/hidden, we explicitly override, so valid too
const whitelist = [
	"disabled",
	"title",
	"hidden",
];

/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = name => {
	if (whitelist.includes(name) || name.startsWith("aria")) {
		return true;
	}
	const classes = [
		HTMLElement,
		Element,
		Node,
	];
	return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

const metadata = {
	events: {
		"_property-change": {},
	},
};

let autoId = 0;

const elementTimeouts = new Map();

const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";

/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.UI5Element
 * @extends HTMLElement
 * @public
 */
class UI5Element extends HTMLElement {
	constructor() {
		super();
		this._initializeState();
		this._upgradeAllProperties();
		this._initializeContainers();
		this._upToDate = false;
		this._inDOM = false;
		this._fullyConnected = false;

		let deferredResolve;
		this._domRefReadyPromise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		this._domRefReadyPromise._deferredResolve = deferredResolve;

		this._monitoredChildProps = new Map();
		this._firePropertyChange = false;
		this._shouldInvalidateParent = false;
	}

	/**
	 * Returns a unique ID for this UI5 Element
	 *
	 * @deprecated - This property is not guaranteed in future releases
	 * @protected
	 */
	get _id() {
		if (!this.__id) {
			this.__id = `ui5wc_${++autoId}`;
		}

		return this.__id;
	}

	/**
	 * @private
	 */
	_initializeContainers() {
		const needsShadowDOM = this.constructor._needsShadowDOM();
		const needsStaticArea = this.constructor._needsStaticArea();

		// Init Shadow Root
		if (needsShadowDOM) {
			this.attachShadow({ mode: "open" });

			// IE11, Edge
			if (window.ShadyDOM) {
				createComponentStyleTag(this.constructor);
			}

			// Chrome
			if (document.adoptedStyleSheets) {
				const style = getConstructableStyle(this.constructor);
				this.shadowRoot.adoptedStyleSheets = [style];
			}
		}

		// Init StaticAreaItem only if needed
		if (needsStaticArea) {
			this.staticAreaItem = new StaticAreaItem(this);
		}
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
	 * @private
	 */
	async connectedCallback() {
		const needsShadowDOM = this.constructor._needsShadowDOM();
		const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();

		this._inDOM = true;

		if (slotsAreManaged) {
			// always register the observer before yielding control to the main thread (await)
			this._startObservingDOMChildren();
			await this._processChildren();
		}

		// Render the Shadow DOM
		if (needsShadowDOM) {
			if (!this.shadowRoot) { // Workaround for Firefox74 bug
				await Promise.resolve();
			}

			if (!this._inDOM) { // Component removed from DOM while _processChildren was running
				return;
			}

			RenderScheduler.register(this);
			RenderScheduler.renderImmediately(this);
			this._domRefReadyPromise._deferredResolve();
			this._fullyConnected = true;
			if (typeof this.onEnterDOM === "function") {
				this.onEnterDOM();
			}
		}
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
	 * @private
	 */
	disconnectedCallback() {
		const needsShadowDOM = this.constructor._needsShadowDOM();
		const needsStaticArea = this.constructor._needsStaticArea();
		const slotsAreManaged = this.constructor.getMetadata().slotsAreManaged();

		this._inDOM = false;

		if (slotsAreManaged) {
			this._stopObservingDOMChildren();
		}

		if (needsShadowDOM) {
			RenderScheduler.deregister(this);
			if (this._fullyConnected) {
				if (typeof this.onExitDOM === "function") {
					this.onExitDOM();
				}
				this._fullyConnected = false;
			}
		}

		if (needsStaticArea) {
			this.staticAreaItem._removeFragmentFromStaticArea();
		}

		RenderScheduler.cancelRender(this);
	}

	/**
	 * @private
	 */
	_startObservingDOMChildren() {
		const shouldObserveChildren = this.constructor.getMetadata().hasSlots();
		if (!shouldObserveChildren) {
			return;
		}

		const canSlotText = this.constructor.getMetadata().canSlotText();
		const mutationObserverOptions = {
			childList: true,
			subtree: canSlotText,
			characterData: true,
		};
		DOMObserver.observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
	}

	/**
	 * @private
	 */
	_stopObservingDOMChildren() {
		DOMObserver.unobserveDOMNode(this);
	}

	/**
	 * Note: this method is also manually called by "compatibility/patchNodeValue.js"
	 * @private
	 */
	async _processChildren() {
		const hasSlots = this.constructor.getMetadata().hasSlots();
		if (hasSlots) {
			await this._updateSlots();
		}
	}

	/**
	 * @private
	 */
	async _updateSlots() {
		const slotsMap = this.constructor.getMetadata().getSlots();
		const canSlotText = this.constructor.getMetadata().canSlotText();
		const domChildren = Array.from(canSlotText ? this.childNodes : this.children);

		// Init the _state object based on the supported slots
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			this._clearSlot(slotName, slotData);
		}

		const autoIncrementMap = new Map();
		const slottedChildrenMap = new Map();

		const allChildrenUpgraded = domChildren.map(async (child, idx) => {
			// Determine the type of the child (mainly by the slot attribute)
			const slotName = this.constructor._getSlotName(child);
			const slotData = slotsMap[slotName];

			// Check if the slotName is supported
			if (slotData === undefined) {
				const validValues = Object.keys(slotsMap).join(", ");
				console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
				return;
			}

			// For children that need individual slots, calculate them
			if (slotData.individualSlots) {
				const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
				autoIncrementMap.set(slotName, nextIndex);
				child._individualSlot = `${slotName}-${nextIndex}`;
			}

			// Await for not-yet-defined custom elements
			if (child instanceof HTMLElement) {
				const localName = child.localName;
				const isCustomElement = localName.includes("-");
				if (isCustomElement) {
					const isDefined = window.customElements.get(localName);
					if (!isDefined) {
						const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
						let timeoutPromise = elementTimeouts.get(localName);
						if (!timeoutPromise) {
							timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
							elementTimeouts.set(localName, timeoutPromise);
						}
						await Promise.race([whenDefinedPromise, timeoutPromise]);
					}
					window.customElements.upgrade(child);
				}
			}

			child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

			if (child.isUI5Element && slotData.listenFor) {
				this._attachChildPropertyUpdated(child, slotData.listenFor);
			}

			if (child.isUI5Element && slotData.invalidateParent) {
				child._shouldInvalidateParent = true;
			}

			if (isSlot(child)) {
				this._attachSlotChange(child);
			}

			const propertyName = slotData.propertyName || slotName;

			if (slottedChildrenMap.has(propertyName)) {
				slottedChildrenMap.get(propertyName).push({ child, idx });
			} else {
				slottedChildrenMap.set(propertyName, [{ child, idx }]);
			}
		});

		await Promise.all(allChildrenUpgraded);

		// Distribute the child in the _state object, keeping the Light DOM order,
		// not the order elements are defined.
		slottedChildrenMap.forEach((children, slot) => {
			this._state[slot] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
		});
		this._invalidate("slots");
	}

	/**
	 * Removes all children from the slot and detaches listeners, if any
	 * @private
	 */
	_clearSlot(slotName, slotData) {
		const propertyName = slotData.propertyName || slotName;

		let children = this._state[propertyName];
		if (!Array.isArray(children)) {
			children = [children];
		}

		children.forEach(child => {
			if (child && child.isUI5Element) {
				this._detachChildPropertyUpdated(child);
				child._shouldInvalidateParent = false;
			}

			if (isSlot(child)) {
				this._detachSlotChange(child);
			}
		});

		this._state[propertyName] = [];
		this._invalidate(propertyName, []);
	}

	/**
	 * Do not override this method in derivatives of UI5Element
	 * @private
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		const properties = this.constructor.getMetadata().getProperties();
		const realName = name.replace(/^ui5-/, "");
		const nameInCamelCase = kebabToCamelCase(realName);
		if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
			const propertyTypeClass = properties[nameInCamelCase].type;
			if (propertyTypeClass === Boolean) {
				newValue = newValue !== null;
			}
			if (propertyTypeClass === Integer) {
				newValue = parseInt(newValue);
			}
			if (propertyTypeClass === Float) {
				newValue = parseFloat(newValue);
			}
			this[nameInCamelCase] = newValue;
		}
	}

	/**
	 * @private
	 */
	_updateAttribute(name, newValue) {
		if (!this.constructor.getMetadata().hasAttribute(name)) {
			return;
		}

		if (typeof newValue === "object") {
			return;
		}

		const attrName = camelToKebabCase(name);
		const attrValue = this.getAttribute(attrName);
		if (typeof newValue === "boolean") {
			if (newValue === true && attrValue === null) {
				this.setAttribute(attrName, "");
			} else if (newValue === false && attrValue !== null) {
				this.removeAttribute(attrName);
			}
		} else if (attrValue !== newValue) {
			this.setAttribute(attrName, newValue);
		}
	}

	/**
	 * @private
	 */
	_upgradeProperty(prop) {
		if (this.hasOwnProperty(prop)) { // eslint-disable-line
			const value = this[prop];
			delete this[prop];
			this[prop] = value;
		}
	}

	/**
	 * @private
	 */
	_upgradeAllProperties() {
		const allProps = this.constructor.getMetadata().getPropertiesList();
		allProps.forEach(this._upgradeProperty, this);
	}

	/**
	 * @private
	 */
	_initializeState() {
		const defaultState = this.constructor._getDefaultState();
		this._state = Object.assign({}, defaultState);
	}

	/**
	 * @private
	 */
	_attachChildPropertyUpdated(child, listenFor) {
		const childMetadata = child.constructor.getMetadata(),
			slotName = this.constructor._getSlotName(child), // all slotted children have the same configuration
			childProperties = childMetadata.getProperties();

		let observedProps = [],
			notObservedProps = [];

		if (Array.isArray(listenFor)) {
			observedProps = listenFor;
		} else {
			observedProps = Array.isArray(listenFor.props) ? listenFor.props : Object.keys(childProperties);
			notObservedProps = Array.isArray(listenFor.exclude) ? listenFor.exclude : [];
		}

		if (!this._monitoredChildProps.has(slotName)) {
			this._monitoredChildProps.set(slotName, { observedProps, notObservedProps });
		}

		child.addEventListener("_property-change", this._invalidateParentOnPropertyUpdate);
		child._firePropertyChange = true;
	}

	/**
	 * @private
	 */
	_detachChildPropertyUpdated(child) {
		child.removeEventListener("_property-change", this._invalidateParentOnPropertyUpdate);
		child._firePropertyChange = false;
	}

	/**
	 * @private
	 */
	_propertyChange(name, value) {
		this._updateAttribute(name, value);

		if (this._firePropertyChange) {
			this.dispatchEvent(new CustomEvent("_property-change", {
				detail: { name, newValue: value },
				composed: false,
				bubbles: true,
			}));
		}
	}

	/**
	 * @private
	 */
	_invalidateParentOnPropertyUpdate(prop) {
		// The web component to be invalidated
		const parentNode = this.parentNode;
		if (!parentNode) {
			return;
		}

		const slotName = parentNode.constructor._getSlotName(this);
		const propsMetadata = parentNode._monitoredChildProps.get(slotName);

		if (!propsMetadata) {
			return;
		}
		const { observedProps, notObservedProps } = propsMetadata;

		if (observedProps.includes(prop.detail.name) && !notObservedProps.includes(prop.detail.name)) {
			parentNode._invalidate("_parent_", this);
		}
	}

	/**
	 * @private
	 */
	_attachSlotChange(child) {
		if (!this._invalidateOnSlotChange) {
			this._invalidateOnSlotChange = () => {
				this._invalidate("slotchange");
			};
		}
		child.addEventListener("slotchange", this._invalidateOnSlotChange);
	}

	/**
	 * @private
	 */
	_detachSlotChange(child) {
		child.removeEventListener("slotchange", this._invalidateOnSlotChange);
	}

	/**
	 * Asynchronously re-renders an already rendered web component
	 * @private
	 */
	_invalidate() {
		if (this._shouldInvalidateParent) {
			this.parentNode._invalidate();
		}

		if (!this._upToDate) {
			// console.log("already invalidated", this, ...arguments);
			return;
		}

		if (this.getDomRef() && !this._suppressInvalidation) {
			this._upToDate = false;
			// console.log("INVAL", this, ...arguments);
			RenderScheduler.renderDeferred(this);
		}
	}

	/**
	 * Do not call this method directly, only intended to be called by RenderScheduler.js
	 * @protected
	 */
	_render() {
		const hasIndividualSlots = this.constructor.getMetadata().hasIndividualSlots();

		// suppress invalidation to prevent state changes scheduling another rendering
		this._suppressInvalidation = true;

		if (typeof this.onBeforeRendering === "function") {
			this.onBeforeRendering();
		}

		// Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
		if (this._onComponentStateFinalized) {
			this._onComponentStateFinalized();
		}

		// resume normal invalidation handling
		delete this._suppressInvalidation;

		// Update the shadow root with the render result
		// console.log(this.getDomRef() ? "RE-RENDER" : "FIRST RENDER", this);
		this._upToDate = true;
		this._updateShadowRoot();

		if (this._shouldUpdateFragment()) {
			this.staticAreaItem._updateFragment(this);
		}

		// Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
		if (hasIndividualSlots) {
			this._assignIndividualSlotsToChildren();
		}

		// Call the onAfterRendering hook
		if (typeof this.onAfterRendering === "function") {
			this.onAfterRendering();
		}
	}

	/**
	 * @private
	 */
	_updateShadowRoot() {
		if (!this.constructor._needsShadowDOM()) {
			return;
		}

		let styleToPrepend;
		const renderResult = this.constructor.template(this);

		if (!document.adoptedStyleSheets && !window.ShadyDOM) {
			styleToPrepend = getEffectiveStyle(this.constructor);
		}
		this.constructor.render(renderResult, this.shadowRoot, styleToPrepend, { eventContext: this });
	}

	/**
	 * @private
	 */
	_assignIndividualSlotsToChildren() {
		const domChildren = Array.from(this.children);

		domChildren.forEach(child => {
			if (child._individualSlot) {
				child.setAttribute("slot", child._individualSlot);
			}
		});
	}

	/**
	 * @private
	 */
	_waitForDomRef() {
		return this._domRefReadyPromise;
	}

	/**
	 * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
	 * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
	 * @public
	 */
	getDomRef() {
		if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
			return;
		}

		return this.shadowRoot.children.length === 1
			? this.shadowRoot.children[0] : this.shadowRoot.children[1];
	}

	/**
	 * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
	 * This is the element that will receive the focus by default.
	 * @public
	 */
	getFocusDomRef() {
		const domRef = this.getDomRef();
		if (domRef) {
			const focusRef = domRef.querySelector("[data-sap-focus-ref]");
			return focusRef || domRef;
		}
	}

	/**
	 * Use this method in order to get a reference to element in the shadow root of a web component
	 * @public
	 * @param {String} refName Defines the name of the stable DOM ref
	 */
	getStableDomRef(refName) {
		return this.getDomRef().querySelector(`[data-ui5-stable=${refName}]`);
	}

	/**
	 * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
	 * @public
	 */
	async focus() {
		await this._waitForDomRef();

		const focusDomRef = this.getFocusDomRef();

		if (focusDomRef && typeof focusDomRef.focus === "function") {
			focusDomRef.focus();
		}
	}

	/**
	 *
	 * @public
	 * @param name - name of the event
	 * @param data - additional data for the event
	 * @param cancelable - true, if the user can call preventDefault on the event object
	 * @param bubbles - true, if the event bubbles
	 * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
	 */
	fireEvent(name, data, cancelable = false, bubbles = true) {
		const eventResult = this._fireEvent(name, data, cancelable, bubbles);
		const camelCaseEventName = kebabToCamelCase(name);

		if (camelCaseEventName !== name) {
			return eventResult && this._fireEvent(camelCaseEventName, data, cancelable);
		}

		return eventResult;
	}

	_fireEvent(name, data, cancelable = false, bubbles = true) {
		let compatEventResult = true; // Initialized to true, because if the event is not fired at all, it should be considered "not-prevented"

		const noConflictEvent = new CustomEvent(`ui5-${name}`, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the compat event is prevented
		compatEventResult = this.dispatchEvent(noConflictEvent);

		if (skipOriginalEvent(name)) {
			return compatEventResult;
		}

		const customEvent = new CustomEvent(name, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the normal event is prevented
		const normalEventResult = this.dispatchEvent(customEvent);

		// Return false if any of the two events was prevented (its result was false).
		return normalEventResult && compatEventResult;
	}

	/**
	 * Returns the actual children, associated with a slot.
	 * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
	 * @public
	 */
	getSlottedNodes(slotName) {
		const reducer = (acc, curr) => {
			if (!isSlot(curr)) {
				return acc.concat([curr]);
			}
			return acc.concat(curr.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement));
		};

		return this[slotName].reduce(reducer, []);
	}

	get isCompact() {
		return getComputedStyle(this).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR) === "compact";
	}

	/**
	 * Determines whether the component should be rendered in RTL mode or not.
	 * Returns: "rtl", "ltr" or undefined
	 *
	 * @public
	 * @returns {String|undefined}
	 */
	get effectiveDir() {
		markAsRtlAware(this.constructor); // if a UI5 Element calls this method, it's considered to be rtl-aware

		const doc = window.document;
		const dirValues = ["ltr", "rtl"]; // exclude "auto" and "" from all calculations
		const locallyAppliedDir = getComputedStyle(this).getPropertyValue(GLOBAL_DIR_CSS_VAR);

		// In that order, inspect the CSS Var (for modern browsers), the element itself, html and body (for IE fallback)
		if (dirValues.includes(locallyAppliedDir)) {
			return locallyAppliedDir;
		}
		if (dirValues.includes(this.dir)) {
			return this.dir;
		}
		if (dirValues.includes(doc.documentElement.dir)) {
			return doc.documentElement.dir;
		}
		if (dirValues.includes(doc.body.dir)) {
			return doc.body.dir;
		}

		// Finally, check the configuration for explicitly set RTL or language-implied RTL
		return getRTL$1() ? "rtl" : undefined;
	}

	updateStaticAreaItemContentDensity() {
		if (this.staticAreaItem) {
			this.staticAreaItem._updateContentDensity(this.isCompact);
		}
	}

	/**
	 * Used to duck-type UI5 elements without using instanceof
	 * @returns {boolean}
	 * @public
	 */
	get isUI5Element() {
		return true;
	}

	/**
	 * Do not override this method in derivatives of UI5Element, use metadata properties instead
	 * @private
	 */
	static get observedAttributes() {
		return this.getMetadata().getAttributesList();
	}

	/**
	 * @private
	 */
	static _getSlotName(child) {
		// Text nodes can only go to the default slot
		if (!(child instanceof HTMLElement)) {
			return "default";
		}

		// Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
		const slot = child.getAttribute("slot");
		if (slot) {
			const match = slot.match(/^(.+?)-\d+$/);
			return match ? match[1] : slot;
		}

		// Use default slot as a fallback
		return "default";
	}

	/**
	 * @private
	 */
	static _needsShadowDOM() {
		return !!this.template;
	}

	_shouldUpdateFragment() {
		return this.constructor._needsStaticArea() && this.staticAreaItem.isRendered();
	}

	/**
	 * @private
	 */
	static _needsStaticArea() {
		return typeof this.staticAreaTemplate === "function";
	}

	/**
	 * @public
	 */
	getStaticAreaItemDomRef() {
		return this.staticAreaItem.getDomRef();
	}

	/**
	 * @private
	 */
	static _getDefaultState() {
		if (this._defaultState) {
			return this._defaultState;
		}

		const MetadataClass = this.getMetadata();
		const defaultState = {};
		const slotsAreManaged = MetadataClass.slotsAreManaged();

		// Initialize properties
		const props = MetadataClass.getProperties();
		for (const propName in props) { // eslint-disable-line
			const propType = props[propName].type;
			const propDefaultValue = props[propName].defaultValue;

			if (propType === Boolean) {
				defaultState[propName] = false;

				if (propDefaultValue !== undefined) {
					console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
				}
			} else if (props[propName].multiple) {
				defaultState[propName] = [];
			} else if (propType === Object) {
				defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
			} else if (propType === String) {
				defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
			} else {
				defaultState[propName] = propDefaultValue;
			}
		}

		// Initialize slots
		if (slotsAreManaged) {
			const slots = MetadataClass.getSlots();
			for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
				const propertyName = slotData.propertyName || slotName;
				defaultState[propertyName] = [];
			}
		}

		this._defaultState = defaultState;
		return defaultState;
	}

	/**
	 * @private
	 */
	static _generateAccessors() {
		const proto = this.prototype;
		const slotsAreManaged = this.getMetadata().slotsAreManaged();

		// Properties
		const properties = this.getMetadata().getProperties();
		for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
			if (!isValidPropertyName(prop)) {
				throw new Error(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`);
			}

			if (propData.type === Boolean && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
			}

			if (propData.type === Array) {
				throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
			}

			if (propData.type === Object && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
			}

			if (propData.multiple && propData.defaultValue) {
				throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
			}

			Object.defineProperty(proto, prop, {
				get() {
					if (this._state[prop] !== undefined) {
						return this._state[prop];
					}

					const propDefaultValue = propData.defaultValue;

					if (propData.type === Boolean) {
						return false;
					} else if (propData.type === String) {  // eslint-disable-line
						return propDefaultValue;
					} else if (propData.multiple) { // eslint-disable-line
						return [];
					} else {
						return propDefaultValue;
					}
				},
				set(value) {
					value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);

					const oldState = this._state[prop];

					if (oldState !== value) {
						this._state[prop] = value;
						this._invalidate(prop, value);
						this._propertyChange(prop, value);
					}
				},
			});
		}

		// Slots
		if (slotsAreManaged) {
			const slots = this.getMetadata().getSlots();
			for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
				if (!isValidPropertyName(slotName)) {
					throw new Error(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`);
				}

				const propertyName = slotData.propertyName || slotName;
				Object.defineProperty(proto, propertyName, {
					get() {
						if (this._state[propertyName] !== undefined) {
							return this._state[propertyName];
						}
						return [];
					},
					set() {
						throw new Error("Cannot set slots directly, use the DOM APIs");
					},
				});
			}
		}
	}

	/**
	 * Returns the metadata object for this UI5 Web Component Class
	 * @protected
	 */
	static get metadata() {
		return metadata;
	}

	/**
	 * Returns the CSS for this UI5 Web Component Class
	 * @protected
	 */
	static get styles() {
		return "";
	}

	/**
	 * Returns the Static Area CSS for this UI5 Web Component Class
	 * @protected
	 */
	static get staticAreaStyles() {
		return "";
	}

	/**
	 * Registers a UI5 Web Component in the browser window object
	 * @public
	 * @returns {Promise<UI5Element>}
	 */
	static async define() {
		await boot();

		if (this.onDefine) {
			await this.onDefine();
		}

		const tag = this.getMetadata().getTag();
		const altTag = this.getMetadata().getAltTag();

		const definedLocally = isTagRegistered(tag);
		const definedGlobally = customElements.get(tag);

		if (definedGlobally && !definedLocally) {
			recordTagRegistrationFailure(tag);
		} else if (!definedGlobally) {
			this._generateAccessors();
			registerTag(tag);
			window.customElements.define(tag, this);

			if (altTag && !customElements.get(altTag)) {
				class oldClassName extends this {}
				registerTag(altTag);
				window.customElements.define(altTag, oldClassName);
			}
		}
		return this;
	}

	/**
	 * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
	 * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
	 * @public
	 * @returns {UI5ElementMetadata}
	 */
	static getMetadata() {
		if (this.hasOwnProperty("_metadata")) { // eslint-disable-line
			return this._metadata;
		}

		const metadataObjects = [this.metadata];
		let klass = this; // eslint-disable-line
		while (klass !== UI5Element) {
			klass = Object.getPrototypeOf(klass);
			metadataObjects.unshift(klass.metadata);
		}
		const mergedMetadata = fnMerge$1({}, ...metadataObjects);

		this._metadata = new UI5ElementMetadata(mergedMetadata);
		return this._metadata;
	}
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes &&
    trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            // this is secure because `this.strings` is a TemplateStringsArray.
            // TODO: validate this when
            // https://github.com/tc39/proposal-array-is-template-object is
            // implemented.
            value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        reparentNodes(content, svgElement.firstChild);
        return template;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        const parts = this.parts;
        // If we're assigning an attribute via syntax like:
        //    attr="${foo}"  or  attr=${foo}
        // but not
        //    attr="${foo} ${bar}" or attr="${foo} baz"
        // then we don't want to coerce the attribute value into one long
        // string. Instead we want to just return the value itself directly,
        // so that sanitizeDOMValue can get the actual value rather than
        // String(value)
        // The exception is if v is an array, in which case we do want to smash
        // it together into a string without calling String() on the array.
        //
        // This also allows trusted values (when using TrustedTypes) being
        // assigned to DOM sinks without being stringified in the process.
        if (l === 1 && strings[0] === '' && strings[1] === '') {
            const v = parts[0].value;
            if (typeof v === 'symbol') {
                return String(v);
            }
            if (typeof v === 'string' || !isIterable(v)) {
                return v;
            }
        }
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Helper functions for manipulating parts
// TODO(kschaaf): Refactor into Part API?
const createAndInsertPart = (containerPart, beforePart) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = beforePart === undefined ? containerPart.endNode :
        beforePart.startNode;
    const startNode = container.insertBefore(createMarker(), beforeNode);
    container.insertBefore(createMarker(), beforeNode);
    const newPart = new NodePart(containerPart.options);
    newPart.insertAfterNode(startNode);
    return newPart;
};
const updatePart = (part, value) => {
    part.setValue(value);
    part.commit();
    return part;
};
const insertPartBefore = (containerPart, part, ref) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = ref ? ref.startNode : containerPart.endNode;
    const endNode = part.endNode.nextSibling;
    if (endNode !== beforeNode) {
        reparentNodes(container, part.startNode, endNode, beforeNode);
    }
};
const removePart = (part) => {
    removeNodes(part.startNode.parentNode, part.startNode, part.endNode.nextSibling);
};
// Helper for generating a map of array item to its index over a subset
// of an array (used to lazily generate `newKeyToIndexMap` and
// `oldKeyToIndexMap`)
const generateMap = (list, start, end) => {
    const map = new Map();
    for (let i = start; i <= end; i++) {
        map.set(list[i], i);
    }
    return map;
};
// Stores previous ordered list of parts and map of key to index
const partListCache = new WeakMap();
const keyListCache = new WeakMap();
/**
 * A directive that repeats a series of values (usually `TemplateResults`)
 * generated from an iterable, and updates those items efficiently when the
 * iterable changes based on user-provided `keys` associated with each item.
 *
 * Note that if a `keyFn` is provided, strict key-to-DOM mapping is maintained,
 * meaning previous DOM for a given key is moved into the new position if
 * needed, and DOM will never be reused with values for different keys (new DOM
 * will always be created for new keys). This is generally the most efficient
 * way to use `repeat` since it performs minimum unnecessary work for insertions
 * and removals.
 *
 * IMPORTANT: If providing a `keyFn`, keys *must* be unique for all items in a
 * given call to `repeat`. The behavior when two or more items have the same key
 * is undefined.
 *
 * If no `keyFn` is provided, this directive will perform similar to mapping
 * items to values, and DOM will be reused against potentially different items.
 */
const repeat = directive((items, keyFnOrTemplate, template) => {
    let keyFn;
    if (template === undefined) {
        template = keyFnOrTemplate;
    }
    else if (keyFnOrTemplate !== undefined) {
        keyFn = keyFnOrTemplate;
    }
    return (containerPart) => {
        if (!(containerPart instanceof NodePart)) {
            throw new Error('repeat can only be used in text bindings');
        }
        // Old part & key lists are retrieved from the last update
        // (associated with the part for this instance of the directive)
        const oldParts = partListCache.get(containerPart) || [];
        const oldKeys = keyListCache.get(containerPart) || [];
        // New part list will be built up as we go (either reused from
        // old parts or created for new keys in this update). This is
        // saved in the above cache at the end of the update.
        const newParts = [];
        // New value list is eagerly generated from items along with a
        // parallel array indicating its key.
        const newValues = [];
        const newKeys = [];
        let index = 0;
        for (const item of items) {
            newKeys[index] = keyFn ? keyFn(item, index) : index;
            newValues[index] = template(item, index);
            index++;
        }
        // Maps from key to index for current and previous update; these
        // are generated lazily only when needed as a performance
        // optimization, since they are only required for multiple
        // non-contiguous changes in the list, which are less common.
        let newKeyToIndexMap;
        let oldKeyToIndexMap;
        // Head and tail pointers to old parts and new values
        let oldHead = 0;
        let oldTail = oldParts.length - 1;
        let newHead = 0;
        let newTail = newValues.length - 1;
        // Overview of O(n) reconciliation algorithm (general approach
        // based on ideas found in ivi, vue, snabbdom, etc.):
        //
        // * We start with the list of old parts and new values (and
        //   arrays of their respective keys), head/tail pointers into
        //   each, and we build up the new list of parts by updating
        //   (and when needed, moving) old parts or creating new ones.
        //   The initial scenario might look like this (for brevity of
        //   the diagrams, the numbers in the array reflect keys
        //   associated with the old parts or new values, although keys
        //   and parts/values are actually stored in parallel arrays
        //   indexed using the same head/tail pointers):
        //
        //      oldHead v                 v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [ ,  ,  ,  ,  ,  ,  ]
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6] <- reflects the user's new
        //                                      item order
        //      newHead ^                 ^ newTail
        //
        // * Iterate old & new lists from both sides, updating,
        //   swapping, or removing parts at the head/tail locations
        //   until neither head nor tail can move.
        //
        // * Example below: keys at head pointers match, so update old
        //   part 0 in-place (no need to move it) and record part 0 in
        //   the `newParts` list. The last thing we do is advance the
        //   `oldHead` and `newHead` pointers (will be reflected in the
        //   next diagram).
        //
        //      oldHead v                 v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  ,  ] <- heads matched: update 0
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
        //                                      & newHead
        //      newHead ^                 ^ newTail
        //
        // * Example below: head pointers don't match, but tail
        //   pointers do, so update part 6 in place (no need to move
        //   it), and record part 6 in the `newParts` list. Last,
        //   advance the `oldTail` and `oldHead` pointers.
        //
        //         oldHead v              v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  , 6] <- tails matched: update 6
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldTail
        //                                      & newTail
        //         newHead ^              ^ newTail
        //
        // * If neither head nor tail match; next check if one of the
        //   old head/tail items was removed. We first need to generate
        //   the reverse map of new keys to index (`newKeyToIndexMap`),
        //   which is done once lazily as a performance optimization,
        //   since we only hit this case if multiple non-contiguous
        //   changes were made. Note that for contiguous removal
        //   anywhere in the list, the head and tails would advance
        //   from either end and pass each other before we get to this
        //   case and removals would be handled in the final while loop
        //   without needing to generate the map.
        //
        // * Example below: The key at `oldTail` was removed (no longer
        //   in the `newKeyToIndexMap`), so remove that part from the
        //   DOM and advance just the `oldTail` pointer.
        //
        //         oldHead v           v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  , 6] <- 5 not in new map: remove
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    5 and advance oldTail
        //         newHead ^           ^ newTail
        //
        // * Once head and tail cannot move, any mismatches are due to
        //   either new or moved items; if a new key is in the previous
        //   "old key to old index" map, move the old part to the new
        //   location, otherwise create and insert a new part. Note
        //   that when moving an old part we null its position in the
        //   oldParts array if it lies between the head and tail so we
        //   know to skip it when the pointers get there.
        //
        // * Example below: neither head nor tail match, and neither
        //   were removed; so find the `newHead` key in the
        //   `oldKeyToIndexMap`, and move that old part's DOM into the
        //   next head position (before `oldParts[oldHead]`). Last,
        //   null the part in the `oldPart` array since it was
        //   somewhere in the remaining oldParts still to be scanned
        //   (between the head and tail pointers) so that we know to
        //   skip that old part on future iterations.
        //
        //         oldHead v        v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2,  ,  ,  ,  , 6] <- stuck: update & move 2
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    into place and advance
        //                                      newHead
        //         newHead ^           ^ newTail
        //
        // * Note that for moves/insertions like the one above, a part
        //   inserted at the head pointer is inserted before the
        //   current `oldParts[oldHead]`, and a part inserted at the
        //   tail pointer is inserted before `newParts[newTail+1]`. The
        //   seeming asymmetry lies in the fact that new parts are
        //   moved into place outside in, so to the right of the head
        //   pointer are old parts, and to the right of the tail
        //   pointer are new parts.
        //
        // * We always restart back from the top of the algorithm,
        //   allowing matching and simple updates in place to
        //   continue...
        //
        // * Example below: the head pointers once again match, so
        //   simply update part 1 and record it in the `newParts`
        //   array.  Last, advance both head pointers.
        //
        //         oldHead v        v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1,  ,  ,  , 6] <- heads matched: update 1
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
        //                                      & newHead
        //            newHead ^        ^ newTail
        //
        // * As mentioned above, items that were moved as a result of
        //   being stuck (the final else clause in the code below) are
        //   marked with null, so we always advance old pointers over
        //   these so we're comparing the next actual old value on
        //   either end.
        //
        // * Example below: `oldHead` is null (already placed in
        //   newParts), so advance `oldHead`.
        //
        //            oldHead v     v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6] <- old head already used:
        //   newParts: [0, 2, 1,  ,  ,  , 6]    advance oldHead
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
        //               newHead ^     ^ newTail
        //
        // * Note it's not critical to mark old parts as null when they
        //   are moved from head to tail or tail to head, since they
        //   will be outside the pointer range and never visited again.
        //
        // * Example below: Here the old tail key matches the new head
        //   key, so the part at the `oldTail` position and move its
        //   DOM to the new head position (before `oldParts[oldHead]`).
        //   Last, advance `oldTail` and `newHead` pointers.
        //
        //               oldHead v  v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4,  ,  , 6] <- old tail matches new
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]   head: update & move 4,
        //                                     advance oldTail & newHead
        //               newHead ^     ^ newTail
        //
        // * Example below: Old and new head keys match, so update the
        //   old head part in place, and advance the `oldHead` and
        //   `newHead` pointers.
        //
        //               oldHead v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4, 3,   ,6] <- heads match: update 3
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance oldHead &
        //                                      newHead
        //                  newHead ^  ^ newTail
        //
        // * Once the new or old pointers move past each other then all
        //   we have left is additions (if old list exhausted) or
        //   removals (if new list exhausted). Those are handled in the
        //   final while loops at the end.
        //
        // * Example below: `oldHead` exceeded `oldTail`, so we're done
        //   with the main loop.  Create the remaining part and insert
        //   it at the new head position, and the update is complete.
        //
        //                   (oldHead > oldTail)
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4, 3, 7 ,6] <- create and insert 7
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
        //                     newHead ^ newTail
        //
        // * Note that the order of the if/else clauses is not
        //   important to the algorithm, as long as the null checks
        //   come first (to ensure we're always working on valid old
        //   parts) and that the final else clause comes last (since
        //   that's where the expensive moves occur). The order of
        //   remaining clauses is is just a simple guess at which cases
        //   will be most common.
        //
        // * TODO(kschaaf) Note, we could calculate the longest
        //   increasing subsequence (LIS) of old items in new position,
        //   and only move those not in the LIS set. However that costs
        //   O(nlogn) time and adds a bit more code, and only helps
        //   make rare types of mutations require fewer moves. The
        //   above handles removes, adds, reversal, swaps, and single
        //   moves of contiguous items in linear time, in the minimum
        //   number of moves. As the number of multiple moves where LIS
        //   might help approaches a random shuffle, the LIS
        //   optimization becomes less helpful, so it seems not worth
        //   the code at this point. Could reconsider if a compelling
        //   case arises.
        while (oldHead <= oldTail && newHead <= newTail) {
            if (oldParts[oldHead] === null) {
                // `null` means old part at head has already been used
                // below; skip
                oldHead++;
            }
            else if (oldParts[oldTail] === null) {
                // `null` means old part at tail has already been used
                // below; skip
                oldTail--;
            }
            else if (oldKeys[oldHead] === newKeys[newHead]) {
                // Old head matches new head; update in place
                newParts[newHead] =
                    updatePart(oldParts[oldHead], newValues[newHead]);
                oldHead++;
                newHead++;
            }
            else if (oldKeys[oldTail] === newKeys[newTail]) {
                // Old tail matches new tail; update in place
                newParts[newTail] =
                    updatePart(oldParts[oldTail], newValues[newTail]);
                oldTail--;
                newTail--;
            }
            else if (oldKeys[oldHead] === newKeys[newTail]) {
                // Old head matches new tail; update and move to new tail
                newParts[newTail] =
                    updatePart(oldParts[oldHead], newValues[newTail]);
                insertPartBefore(containerPart, oldParts[oldHead], newParts[newTail + 1]);
                oldHead++;
                newTail--;
            }
            else if (oldKeys[oldTail] === newKeys[newHead]) {
                // Old tail matches new head; update and move to new head
                newParts[newHead] =
                    updatePart(oldParts[oldTail], newValues[newHead]);
                insertPartBefore(containerPart, oldParts[oldTail], oldParts[oldHead]);
                oldTail--;
                newHead++;
            }
            else {
                if (newKeyToIndexMap === undefined) {
                    // Lazily generate key-to-index maps, used for removals &
                    // moves below
                    newKeyToIndexMap = generateMap(newKeys, newHead, newTail);
                    oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail);
                }
                if (!newKeyToIndexMap.has(oldKeys[oldHead])) {
                    // Old head is no longer in new list; remove
                    removePart(oldParts[oldHead]);
                    oldHead++;
                }
                else if (!newKeyToIndexMap.has(oldKeys[oldTail])) {
                    // Old tail is no longer in new list; remove
                    removePart(oldParts[oldTail]);
                    oldTail--;
                }
                else {
                    // Any mismatches at this point are due to additions or
                    // moves; see if we have an old part we can reuse and move
                    // into place
                    const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]);
                    const oldPart = oldIndex !== undefined ? oldParts[oldIndex] : null;
                    if (oldPart === null) {
                        // No old part for this value; create a new one and
                        // insert it
                        const newPart = createAndInsertPart(containerPart, oldParts[oldHead]);
                        updatePart(newPart, newValues[newHead]);
                        newParts[newHead] = newPart;
                    }
                    else {
                        // Reuse old part
                        newParts[newHead] =
                            updatePart(oldPart, newValues[newHead]);
                        insertPartBefore(containerPart, oldPart, oldParts[oldHead]);
                        // This marks the old part as having been used, so that
                        // it will be skipped in the first two checks above
                        oldParts[oldIndex] = null;
                    }
                    newHead++;
                }
            }
        }
        // Add parts for any remaining new values
        while (newHead <= newTail) {
            // For all remaining additions, we insert before last new
            // tail, since old pointers are no longer valid
            const newPart = createAndInsertPart(containerPart, newParts[newTail + 1]);
            updatePart(newPart, newValues[newHead]);
            newParts[newHead++] = newPart;
        }
        // Remove any remaining unused old parts
        while (oldHead <= oldTail) {
            const oldPart = oldParts[oldHead++];
            if (oldPart !== null) {
                removePart(oldPart);
            }
        }
        // Save order of new parts for next round
        partListCache.set(containerPart, newParts);
        keyListCache.set(containerPart, newKeys);
    };
});

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
    constructor(element) {
        this.classes = new Set();
        this.changed = false;
        this.element = element;
        const classList = (element.getAttribute('class') || '').split(/\s+/);
        for (const cls of classList) {
            this.classes.add(cls);
        }
    }
    add(cls) {
        this.classes.add(cls);
        this.changed = true;
    }
    remove(cls) {
        this.classes.delete(cls);
        this.changed = true;
    }
    commit() {
        if (this.changed) {
            let classString = '';
            this.classes.forEach((cls) => classString += cls + ' ');
            this.element.setAttribute('class', classString);
        }
    }
}
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */
const classMap = directive((classInfo) => (part) => {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'class' || part.committer.parts.length > 1) {
        throw new Error('The `classMap` directive must be used in the `class` attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { element } = committer;
    let previousClasses = previousClassesCache.get(part);
    if (previousClasses === undefined) {
        // Write static classes once
        // Use setAttribute() because className isn't a string on SVG elements
        element.setAttribute('class', committer.strings.join(' '));
        previousClassesCache.set(part, previousClasses = new Set());
    }
    const classList = (element.classList || new ClassList(element));
    // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousClasses.forEach((name) => {
        if (!(name in classInfo)) {
            classList.remove(name);
            previousClasses.delete(name);
        }
    });
    // Add or remove classes based on their classMap value
    for (const name in classInfo) {
        const value = classInfo[name];
        if (value != previousClasses.has(name)) {
            // We explicitly want a loose truthy check of `value` because it seems
            // more convenient that '' and 0 are skipped.
            if (value) {
                classList.add(name);
                previousClasses.add(name);
            }
            else {
                classList.remove(name);
                previousClasses.delete(name);
            }
        }
    }
    if (typeof classList.commit === 'function') {
        classList.commit();
    }
});

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
const previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */
const styleMap = directive((styleInfo) => (part) => {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'style' || part.committer.parts.length > 1) {
        throw new Error('The `styleMap` directive must be used in the style attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { style } = committer.element;
    let previousStyleProperties = previousStylePropertyCache.get(part);
    if (previousStyleProperties === undefined) {
        // Write static styles once
        style.cssText = committer.strings.join(' ');
        previousStylePropertyCache.set(part, previousStyleProperties = new Set());
    }
    // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousStyleProperties.forEach((name) => {
        if (!(name in styleInfo)) {
            previousStyleProperties.delete(name);
            if (name.indexOf('-') === -1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style[name] = null;
            }
            else {
                style.removeProperty(name);
            }
        }
    });
    // Add or update properties
    for (const name in styleInfo) {
        previousStyleProperties.add(name);
        if (name.indexOf('-') === -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style[name] = styleInfo[name];
        }
        else {
            style.setProperty(name, styleInfo[name]);
        }
    }
});

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// For each part, remember the value that was last rendered to the part by the
// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.
const previousValues = new WeakMap();
/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */
const unsafeHTML = directive((value) => (part) => {
    if (!(part instanceof NodePart)) {
        throw new Error('unsafeHTML can only be used in text bindings');
    }
    const previousValue = previousValues.get(part);
    if (previousValue !== undefined && isPrimitive(value) &&
        value === previousValue.value && part.value === previousValue.fragment) {
        return;
    }
    const template = document.createElement('template');
    template.innerHTML = value; // innerHTML casts to string internally
    const fragment = document.importNode(template.content, true);
    part.setValue(fragment);
    previousValues.set(part, { value, fragment });
});

const litRender = (templateResult, domNode, styles, { eventContext } = {}) => {
	if (styles) {
		templateResult = html`<style>${styles}</style>${templateResult}`;
	}
	render(templateResult, domNode, { eventContext });
};

const resources = new Map();
const cldrData = {};
const cldrUrls = {};

// externally configurable mapping function for resolving (localeId -> URL)
// default implementation - ui5 CDN
let cldrMappingFn = locale => `https://ui5.sap.com/1.60.2/resources/sap/ui/core/cldr/${locale}.json`;

const M_ISO639_OLD_TO_NEW$1 = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
	"sh": "sr",
};

const calcLocale = (language, region, script) => {
	// normalize language and handle special cases
	language = (language && M_ISO639_OLD_TO_NEW$1[language]) || language;
	// Special case 1: in an SAP context, the inclusive language code "no" always means Norwegian Bokmal ("nb")
	if (language === "no") {
		language = "nb";
	}
	// Special case 2: for Chinese, derive a default region from the script (this behavior is inherited from Java)
	if (language === "zh" && !region) {
		if (script === "Hans") {
			region = "CN";
		} else if (script === "Hant") {
			region = "TW";
		}
	}

	// try language + region
	let localeId = `${language}_${region}`;
	if (!SUPPORTED_LOCALES.includes(localeId)) {
		// fallback to language only
		localeId = language;
	}
	if (!SUPPORTED_LOCALES.includes(localeId)) {
		// fallback to english
		localeId = DEFAULT_LOCALE;
	}

	return localeId;
};


const resolveMissingMappings = () => {
	if (!cldrMappingFn) {
		return;
	}

	const missingLocales = SUPPORTED_LOCALES.filter(locale => !cldrData[locale] && !cldrUrls[locale]);
	missingLocales.forEach(locale => {
		cldrUrls[locale] = cldrMappingFn(locale);
	});
};

const registerModuleContent = (moduleName, content) => {
	resources.set(moduleName, content);
};

const getModuleContent = moduleName => {
	const moduleContent = resources.get(moduleName);
	if (moduleContent) {
		return moduleContent;
	}

	const missingModule = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);
	if (missingModule) {
		throw new Error(`CLDR data for locale ${missingModule[1]} is not loaded!`);
	}

	throw new Error(`Unknown module ${moduleName}`);
};

const fetchCldr = async (language, region, script) => {
	resolveMissingMappings();
	const localeId = calcLocale(language, region, script);

	let cldrObj = cldrData[localeId];
	const url = cldrUrls[localeId];

	const OpenUI5Support = getFeature("OpenUI5Support");
	if (!cldrObj && OpenUI5Support) {
		cldrObj = OpenUI5Support.getLocaleDataObject();
	}

	if (cldrObj) {
		// inlined from build or fetched independently
		registerModuleContent(`sap/ui/core/cldr/${localeId}.json`, cldrObj);
	} else if (url) {
		// fetch it
		const cldrContent = await fetchJsonOnce(url);
		registerModuleContent(`sap/ui/core/cldr/${localeId}.json`, cldrContent);
	}
};

/**
 * Different calendar types.
 */
const CalendarTypes = {
	Gregorian: "Gregorian",
	Islamic: "Islamic",
	Japanese: "Japanese",
	Buddhist: "Buddhist",
	Persian: "Persian",
};

class CalendarType extends DataType {
	static isValid(value) {
		return !!CalendarTypes[value];
	}
}

CalendarType.generataTypeAcessors(CalendarTypes);

let calendarType;

const getCalendarType$1 = () => {
	if (calendarType === undefined) {
		calendarType = getCalendarType();
	}

	if (CalendarType.isValid(calendarType)) {
		return calendarType;
	}

	return CalendarType.Gregorian;
};

const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;

class Locale {
	constructor(sLocaleId) {
		const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));
		if (aResult === null) {
			throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
		}
		this.sLocaleId = sLocaleId;
		this.sLanguage = aResult[1] || null;
		this.sScript = aResult[2] || null;
		this.sRegion = aResult[3] || null;
		this.sVariant = (aResult[4] && aResult[4].slice(1)) || null;
		this.sExtension = (aResult[5] && aResult[5].slice(1)) || null;
		this.sPrivateUse = aResult[6] || null;
		if (this.sLanguage) {
			this.sLanguage = this.sLanguage.toLowerCase();
		}
		if (this.sScript) {
			this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, s => {
				return s.toUpperCase();
			});
		}
		if (this.sRegion) {
			this.sRegion = this.sRegion.toUpperCase();
		}
	}

	getLanguage() {
		return this.sLanguage;
	}

	getScript() {
		return this.sScript;
	}

	getRegion() {
		return this.sRegion;
	}

	getVariant() {
		return this.sVariant;
	}

	getVariantSubtags() {
		return this.sVariant ? this.sVariant.split("-") : [];
	}

	getExtension() {
		return this.sExtension;
	}

	getExtensionSubtags() {
		return this.sExtension ? this.sExtension.slice(2).split("-") : [];
	}

	getPrivateUse() {
		return this.sPrivateUse;
	}

	getPrivateUseSubtags() {
		return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
	}

	hasPrivateUseSubtag(sSubtag) {
		return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
	}

	toString() {
		const r = [this.sLanguage];

		if (this.sScript) {
			r.push(this.sScript);
		}
		if (this.sRegion) {
			r.push(this.sRegion);
		}
		if (this.sVariant) {
			r.push(this.sVariant);
		}
		if (this.sExtension) {
			r.push(this.sExtension);
		}
		if (this.sPrivateUse) {
			r.push(this.sPrivateUse);
		}
		return r.join("-");
	}
}

const convertToLocaleOrNull = lang => {
	try {
		if (lang && typeof lang === "string") {
			return new Locale(lang);
		}
	} catch (e) {
		// ignore
	}
};

/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = lang => {
	if (lang) {
		return convertToLocaleOrNull(lang);
	}

	if (getLanguage$1()) {
		return new Locale(getLanguage$1());
	}

	return convertToLocaleOrNull(detectNavigatorLanguage());
};

const emptyFn = () => {};

/**
 * OpenUI5 FormatSettings shim
 */
const FormatSettings = {
	getFormatLocale: getLocale,
	getLegacyDateFormat: emptyFn,
	getLegacyDateCalendarCustomizing: emptyFn,
	getCustomLocaleData: emptyFn,
};

/**
 * OpenUI5 Configuration Shim
 */
const Configuration = {
	getLanguage: getLanguage$1,
	getCalendarType: getCalendarType$1,
	getSupportedLanguages: () => getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$"),
	getOriginInfo: emptyFn,
	getFormatSettings: () => FormatSettings,
};

/**
 * OpenUI5 Core shim
 */
const Core = {
	getConfiguration: () => Configuration,
	getLibraryResourceBundle: emptyFn(),
	getFormatSettings: () => FormatSettings,
};

var class2type$1 = {};
var hasOwn$1 = class2type$1.hasOwnProperty;
var toString$1 = class2type$1.toString;
var fnToString$1 = hasOwn$1.toString;
var ObjectFunctionString$1 = fnToString$1.call(Object);
var fnIsPlainObject$1 = function (obj) {
  var proto, Ctor;
  if (!obj || toString$1.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn$1.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString$1.call(Ctor) === ObjectFunctionString$1;
};

var oToken$1 = Object.create(null);
var fnMerge$2 = function () {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken$1;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject$1(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && fnIsPlainObject$1(src) ? src : {};
                    }
                    target[name] = fnMerge$2(deep, arguments[1], clone, copy);
                } else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

var fnExtend = function () {
    var args = [
        false,
        true
    ];
    args.push.apply(args, arguments);
    return fnMerge$2.apply(null, args);
};

var BaseObject;
var Interface = function (oObject, aMethods, bFacade) {
  if (!oObject) {
    return oObject;
  }
  BaseObject = BaseObject || sap.ui.requireSync("sap/ui/base/Object");
  function fCreateDelegator(oObject, sMethodName) {
    return function () {
      var tmp = oObject[sMethodName].apply(oObject, arguments);
      if (bFacade) {
        return this;
      } else {
        return tmp instanceof BaseObject ? tmp.getInterface() : tmp;
      }
    };
  }
  if (!aMethods) {
    return {};
  }
  var sMethodName;
  for (var i = 0, ml = aMethods.length; i < ml; i++) {
    sMethodName = aMethods[i];
    if (!oObject[sMethodName] || typeof oObject[sMethodName] === "function") {
      this[sMethodName] = fCreateDelegator(oObject, sMethodName);
    }
  }
};

var ObjectPath = {};
var defaultRootContext = window;
function getObjectPathArray(vObjectPath) {
  return Array.isArray(vObjectPath) ? vObjectPath.slice() : vObjectPath.split(".");
}
ObjectPath.create = function (vObjectPath, oRootContext) {
  var oObject = oRootContext || defaultRootContext;
  var aNames = getObjectPathArray(vObjectPath);
  for (var i = 0; i < aNames.length; i++) {
    var sName = aNames[i];
    if (oObject[sName] === null || oObject[sName] !== undefined && (typeof oObject[sName] !== "object" && typeof oObject[sName] !== "function")) {
      throw new Error("Could not set object-path for '" + aNames.join(".") + "', path segment '" + sName + "' already exists.");
    }
    oObject[sName] = oObject[sName] || ({});
    oObject = oObject[sName];
  }
  return oObject;
};
ObjectPath.get = function (vObjectPath, oRootContext) {
  var oObject = oRootContext || defaultRootContext;
  var aNames = getObjectPathArray(vObjectPath);
  var sPropertyName = aNames.pop();
  for (var i = 0; i < aNames.length && oObject; i++) {
    oObject = oObject[aNames[i]];
  }
  return oObject ? oObject[sPropertyName] : undefined;
};
ObjectPath.set = function (vObjectPath, vValue, oRootContext) {
  oRootContext = oRootContext || defaultRootContext;
  var aNames = getObjectPathArray(vObjectPath);
  var sPropertyName = aNames.pop();
  var oObject = ObjectPath.create(aNames, oRootContext);
  oObject[sPropertyName] = vValue;
};

var Device = {
  browser: {
    phantomJS: false
  }
};

var fnNow = !(typeof window != "undefined" && window.performance && performance.now && performance.timing) ? Date.now : (function () {
  var iNavigationStart = performance.timing.navigationStart;
  return function perfnow() {
    return iNavigationStart + performance.now();
  };
})();

var Log = {};
Log.Level = {
    NONE: -1,
    FATAL: 0,
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5,
    ALL: 5 + 1
};
var sDefaultComponent, aLog = [], mMaxLevel = { '': Log.Level.ERROR }, iLogEntriesLimit = 3000, oListener = null, bLogSupportInfo = false;
function pad0(i, w) {
    return ('000' + String(i)).slice(-w);
}
function level(sComponent) {
    return !sComponent || isNaN(mMaxLevel[sComponent]) ? mMaxLevel[''] : mMaxLevel[sComponent];
}
function discardLogEntries() {
    var iLogLength = aLog.length;
    if (iLogLength) {
        var iEntriesToKeep = Math.min(iLogLength, Math.floor(iLogEntriesLimit * 0.7));
        if (oListener) {
            oListener.onDiscardLogEntries(aLog.slice(0, iLogLength - iEntriesToKeep));
        }
        if (iEntriesToKeep) {
            aLog = aLog.slice(-iEntriesToKeep, iLogLength);
        } else {
            aLog = [];
        }
    }
}
function getLogEntryListenerInstance() {
    if (!oListener) {
        oListener = {
            listeners: [],
            onLogEntry: function (oLogEntry) {
                for (var i = 0; i < oListener.listeners.length; i++) {
                    if (oListener.listeners[i].onLogEntry) {
                        oListener.listeners[i].onLogEntry(oLogEntry);
                    }
                }
            },
            onDiscardLogEntries: function (aDiscardedLogEntries) {
                for (var i = 0; i < oListener.listeners.length; i++) {
                    if (oListener.listeners[i].onDiscardLogEntries) {
                        oListener.listeners[i].onDiscardLogEntries(aDiscardedLogEntries);
                    }
                }
            },
            attach: function (oLog, oLstnr) {
                if (oLstnr) {
                    oListener.listeners.push(oLstnr);
                    if (oLstnr.onAttachToLog) {
                        oLstnr.onAttachToLog(oLog);
                    }
                }
            },
            detach: function (oLog, oLstnr) {
                for (var i = 0; i < oListener.listeners.length; i++) {
                    if (oListener.listeners[i] === oLstnr) {
                        if (oLstnr.onDetachFromLog) {
                            oLstnr.onDetachFromLog(oLog);
                        }
                        oListener.listeners.splice(i, 1);
                        return;
                    }
                }
            }
        };
    }
    return oListener;
}
Log.fatal = function (sMessage, sDetails, sComponent, fnSupportInfo) {
    log(Log.Level.FATAL, sMessage, sDetails, sComponent, fnSupportInfo);
};
Log.error = function (sMessage, sDetails, sComponent, fnSupportInfo) {
    log(Log.Level.ERROR, sMessage, sDetails, sComponent, fnSupportInfo);
};
Log.warning = function (sMessage, sDetails, sComponent, fnSupportInfo) {
    log(Log.Level.WARNING, sMessage, sDetails, sComponent, fnSupportInfo);
};
Log.info = function (sMessage, sDetails, sComponent, fnSupportInfo) {
    log(Log.Level.INFO, sMessage, sDetails, sComponent, fnSupportInfo);
};
Log.debug = function (sMessage, sDetails, sComponent, fnSupportInfo) {
    log(Log.Level.DEBUG, sMessage, sDetails, sComponent, fnSupportInfo);
};
Log.trace = function (sMessage, sDetails, sComponent, fnSupportInfo) {
    log(Log.Level.TRACE, sMessage, sDetails, sComponent, fnSupportInfo);
};
Log.setLevel = function (iLogLevel, sComponent, _bDefault) {
    sComponent = sComponent || sDefaultComponent || '';
    if (!_bDefault || mMaxLevel[sComponent] == null) {
        mMaxLevel[sComponent] = iLogLevel;
        var sLogLevel;
        Object.keys(Log.Level).forEach(function (sLevel) {
            if (Log.Level[sLevel] === iLogLevel) {
                sLogLevel = sLevel;
            }
        });
        log(Log.Level.INFO, 'Changing log level ' + (sComponent ? 'for \'' + sComponent + '\' ' : '') + 'to ' + sLogLevel, '', 'sap.base.log');
    }
};
Log.getLevel = function (sComponent) {
    return level(sComponent || sDefaultComponent);
};
Log.isLoggable = function (iLevel, sComponent) {
    return (iLevel == null ? Log.Level.DEBUG : iLevel) <= level(sComponent || sDefaultComponent);
};
Log.logSupportInfo = function (bEnabled) {
    bLogSupportInfo = bEnabled;
};
function log(iLevel, sMessage, sDetails, sComponent, fnSupportInfo) {
    if (!fnSupportInfo && !sComponent && typeof sDetails === 'function') {
        fnSupportInfo = sDetails;
        sDetails = '';
    }
    if (!fnSupportInfo && typeof sComponent === 'function') {
        fnSupportInfo = sComponent;
        sComponent = '';
    }
    sComponent = sComponent || sDefaultComponent;
    if (iLevel <= level(sComponent)) {
        var fNow = fnNow(), oNow = new Date(fNow), iMicroSeconds = Math.floor((fNow - Math.floor(fNow)) * 1000), oLogEntry = {
                time: pad0(oNow.getHours(), 2) + ':' + pad0(oNow.getMinutes(), 2) + ':' + pad0(oNow.getSeconds(), 2) + '.' + pad0(oNow.getMilliseconds(), 3) + pad0(iMicroSeconds, 3),
                date: pad0(oNow.getFullYear(), 4) + '-' + pad0(oNow.getMonth() + 1, 2) + '-' + pad0(oNow.getDate(), 2),
                timestamp: fNow,
                level: iLevel,
                message: String(sMessage || ''),
                details: String(sDetails || ''),
                component: String(sComponent || '')
            };
        if (bLogSupportInfo && typeof fnSupportInfo === 'function') {
            oLogEntry.supportInfo = fnSupportInfo();
        }
        if (iLogEntriesLimit) {
            if (aLog.length >= iLogEntriesLimit) {
                discardLogEntries();
            }
            aLog.push(oLogEntry);
        }
        if (oListener) {
            oListener.onLogEntry(oLogEntry);
        }
        if (console) {
            var isDetailsError = sDetails instanceof Error, logText = oLogEntry.date + ' ' + oLogEntry.time + ' ' + oLogEntry.message + ' - ' + oLogEntry.details + ' ' + oLogEntry.component;
            switch (iLevel) {
            case Log.Level.FATAL:
            case Log.Level.ERROR:
                isDetailsError ? console.error(logText, '\n', sDetails) : console.error(logText);
                break;
            case Log.Level.WARNING:
                isDetailsError ? console.warn(logText, '\n', sDetails) : console.warn(logText);
                break;
            case Log.Level.INFO:
                if (console.info) {
                    isDetailsError ? console.info(logText, '\n', sDetails) : console.info(logText);
                } else {
                    isDetailsError ? console.log(logText, '\n', sDetails) : console.log(logText);
                }
                break;
            case Log.Level.DEBUG:
                if (console.debug) {
                    isDetailsError ? console.debug(logText, '\n', sDetails) : console.debug(logText);
                } else {
                    isDetailsError ? console.log(logText, '\n', sDetails) : console.log(logText);
                }
                break;
            case Log.Level.TRACE:
                if (console.trace) {
                    isDetailsError ? console.trace(logText, '\n', sDetails) : console.trace(logText);
                } else {
                    isDetailsError ? console.log(logText, '\n', sDetails) : console.log(logText);
                }
                break;
            }
            if (console.info && oLogEntry.supportInfo) {
                console.info(oLogEntry.supportInfo);
            }
        }
        return oLogEntry;
    }
}
Log.getLogEntries = function () {
    return aLog.slice();
};
Log.getLogEntriesLimit = function () {
    return iLogEntriesLimit;
};
Log.setLogEntriesLimit = function (iLimit) {
    if (iLimit < 0) {
        throw new Error('The log entries limit needs to be greater than or equal to 0!');
    }
    iLogEntriesLimit = iLimit;
    if (aLog.length >= iLogEntriesLimit) {
        discardLogEntries();
    }
};
Log.addLogListener = function (oListener) {
    getLogEntryListenerInstance().attach(this, oListener);
};
Log.removeLogListener = function (oListener) {
    getLogEntryListenerInstance().detach(this, oListener);
};
function Logger(sComponent) {
    this.fatal = function (msg, detail, comp, support) {
        Log.fatal(msg, detail, comp || sComponent, support);
        return this;
    };
    this.error = function (msg, detail, comp, support) {
        Log.error(msg, detail, comp || sComponent, support);
        return this;
    };
    this.warning = function (msg, detail, comp, support) {
        Log.warning(msg, detail, comp || sComponent, support);
        return this;
    };
    this.info = function (msg, detail, comp, support) {
        Log.info(msg, detail, comp || sComponent, support);
        return this;
    };
    this.debug = function (msg, detail, comp, support) {
        Log.debug(msg, detail, comp || sComponent, support);
        return this;
    };
    this.trace = function (msg, detail, comp, support) {
        Log.trace(msg, detail, comp || sComponent, support);
        return this;
    };
    this.setLevel = function (level, comp) {
        Log.setLevel(level, comp || sComponent);
        return this;
    };
    this.getLevel = function (comp) {
        return Log.getLevel(comp || sComponent);
    };
    this.isLoggable = function (level, comp) {
        return Log.isLoggable(level, comp || sComponent);
    };
}
Log.getLogger = function (sComponent, iDefaultLogLevel) {
    if (!isNaN(iDefaultLogLevel) && mMaxLevel[sComponent] == null) {
        mMaxLevel[sComponent] = iDefaultLogLevel;
    }
    return new Logger(sComponent);
};

var fnAssert = function (bResult, vMessage) {
    if (!bResult) {
        var sMessage = typeof vMessage === 'function' ? vMessage() : vMessage;
        if (console && console.assert) {
            console.assert(bResult, sMessage);
        } else {
            Log.debug('[Assertions] ' + sMessage);
        }
    }
};

var fnUniqueSort = function (aArray) {
    fnAssert(aArray instanceof Array, 'uniqueSort: input parameter must be an Array');
    var l = aArray.length;
    if (l > 1) {
        aArray.sort();
        var j = 0;
        for (var i = 1; i < l; i++) {
            if (aArray[i] !== aArray[j]) {
                aArray[++j] = aArray[i];
            }
        }
        if (++j < l) {
            aArray.splice(j, l - j);
        }
    }
    return aArray;
};

var Metadata = function (sClassName, oClassInfo) {
    fnAssert(typeof sClassName === 'string' && sClassName, 'Metadata: sClassName must be a non-empty string');
    fnAssert(typeof oClassInfo === 'object', 'Metadata: oClassInfo must be empty or an object');
    if (!oClassInfo || typeof oClassInfo.metadata !== 'object') {
        oClassInfo = {
            metadata: oClassInfo || {},
            constructor: ObjectPath.get(sClassName)
        };
        oClassInfo.metadata.__version = 1;
    }
    oClassInfo.metadata.__version = oClassInfo.metadata.__version || 2;
    if (typeof oClassInfo.constructor !== 'function') {
        throw Error('constructor for class ' + sClassName + ' must have been declared before creating metadata for it');
    }
    this._sClassName = sClassName;
    this._oClass = oClassInfo.constructor;
    this.extend(oClassInfo);
};
Metadata.prototype.extend = function (oClassInfo) {
    this.applySettings(oClassInfo);
    this.afterApplySettings();
};
Metadata.prototype.applySettings = function (oClassInfo) {
    var that = this, oStaticInfo = oClassInfo.metadata, oPrototype;
    if (oStaticInfo.baseType) {
        var oParentClass = ObjectPath.get(oStaticInfo.baseType);
        if (typeof oParentClass !== 'function') {
            Log.fatal('base class \'' + oStaticInfo.baseType + '\' does not exist');
        }
        if (oParentClass.getMetadata) {
            this._oParent = oParentClass.getMetadata();
            fnAssert(oParentClass === oParentClass.getMetadata().getClass(), 'Metadata: oParentClass must match the class in the parent metadata');
        } else {
            this._oParent = new Metadata(oStaticInfo.baseType, {});
        }
    } else {
        this._oParent = undefined;
    }
    this._bAbstract = !!oStaticInfo['abstract'];
    this._bFinal = !!oStaticInfo['final'];
    this._sStereotype = oStaticInfo.stereotype || (this._oParent ? this._oParent._sStereotype : 'object');
    this._bDeprecated = !!oStaticInfo['deprecated'];
    this._aInterfaces = oStaticInfo.interfaces || [];
    this._aPublicMethods = oStaticInfo.publicMethods || [];
    this._bInterfacesUnique = false;
    oPrototype = this._oClass.prototype;
    for (var n in oClassInfo) {
        if (n !== 'metadata' && n !== 'constructor') {
            oPrototype[n] = oClassInfo[n];
            if (!n.match(/^_|^on|^init$|^exit$/)) {
                that._aPublicMethods.push(n);
            }
        }
    }
};
Metadata.prototype.afterApplySettings = function () {
    if (this._oParent) {
        this._aAllPublicMethods = this._oParent._aAllPublicMethods.concat(this._aPublicMethods);
        this._bInterfacesUnique = false;
    } else {
        this._aAllPublicMethods = this._aPublicMethods;
    }
};
Metadata.prototype.getStereotype = function () {
    return this._sStereotype;
};
Metadata.prototype.getName = function () {
    return this._sClassName;
};
Metadata.prototype.getClass = function () {
    return this._oClass;
};
Metadata.prototype.getParent = function () {
    return this._oParent;
};
Metadata.prototype._dedupInterfaces = function () {
    if (!this._bInterfacesUnique) {
        fnUniqueSort(this._aInterfaces);
        fnUniqueSort(this._aPublicMethods);
        fnUniqueSort(this._aAllPublicMethods);
        this._bInterfacesUnique = true;
    }
};
Metadata.prototype.getPublicMethods = function () {
    this._dedupInterfaces();
    return this._aPublicMethods;
};
Metadata.prototype.getAllPublicMethods = function () {
    this._dedupInterfaces();
    return this._aAllPublicMethods;
};
Metadata.prototype.getInterfaces = function () {
    this._dedupInterfaces();
    return this._aInterfaces;
};
Metadata.prototype.isInstanceOf = function (sInterface) {
    if (this._oParent) {
        if (this._oParent.isInstanceOf(sInterface)) {
            return true;
        }
    }
    var a = this._aInterfaces;
    for (var i = 0, l = a.length; i < l; i++) {
        if (a[i] === sInterface) {
            return true;
        }
    }
    return false;
};
var WRITABLE_IFF_PHANTOM = !!Device.browser.phantomJS;
Object.defineProperty(Metadata.prototype, '_mImplementedTypes', {
    get: function () {
        if (this === Metadata.prototype) {
            throw new Error('sap.ui.base.Metadata: The \'_mImplementedTypes\' property must not be accessed on the prototype');
        }
        var result = Object.create(this._oParent ? this._oParent._mImplementedTypes : null);
        result[this._sClassName] = true;
        var aInterfaces = this._aInterfaces, i = aInterfaces.length;
        while (i-- > 0) {
            if (!result[aInterfaces[i]]) {
                result[aInterfaces[i]] = true;
            }
        }
        Object.defineProperty(this, '_mImplementedTypes', {
            value: Object.freeze(result),
            writable: WRITABLE_IFF_PHANTOM,
            configurable: false
        });
        return result;
    },
    configurable: true
});
Metadata.prototype.isA = function (vTypeName) {
    var mTypes = this._mImplementedTypes;
    if (Array.isArray(vTypeName)) {
        for (var i = 0; i < vTypeName.length; i++) {
            if (vTypeName[i] in mTypes) {
                return true;
            }
        }
        return false;
    }
    return vTypeName in mTypes;
};
Metadata.prototype.isAbstract = function () {
    return this._bAbstract;
};
Metadata.prototype.isFinal = function () {
    return this._bFinal;
};
Metadata.prototype.isDeprecated = function () {
    return this._bDeprecated;
};
Metadata.prototype.addPublicMethods = function (sMethod) {
    var aNames = sMethod instanceof Array ? sMethod : arguments;
    Array.prototype.push.apply(this._aPublicMethods, aNames);
    Array.prototype.push.apply(this._aAllPublicMethods, aNames);
    this._bInterfacesUnique = false;
};
Metadata.createClass = function (fnBaseClass, sClassName, oClassInfo, FNMetaImpl) {
    if (typeof fnBaseClass === 'string') {
        FNMetaImpl = oClassInfo;
        oClassInfo = sClassName;
        sClassName = fnBaseClass;
        fnBaseClass = null;
    }
    fnAssert(!fnBaseClass || typeof fnBaseClass === 'function');
    fnAssert(typeof sClassName === 'string' && !!sClassName);
    fnAssert(!oClassInfo || typeof oClassInfo === 'object');
    fnAssert(!FNMetaImpl || typeof FNMetaImpl === 'function');
    FNMetaImpl = FNMetaImpl || Metadata;
    if (typeof FNMetaImpl.preprocessClassInfo === 'function') {
        oClassInfo = FNMetaImpl.preprocessClassInfo(oClassInfo);
    }
    oClassInfo = oClassInfo || {};
    oClassInfo.metadata = oClassInfo.metadata || {};
    if (!oClassInfo.hasOwnProperty('constructor')) {
        oClassInfo.constructor = undefined;
    }
    var fnClass = oClassInfo.constructor;
    fnAssert(!fnClass || typeof fnClass === 'function');
    if (fnBaseClass) {
        if (!fnClass) {
            if (oClassInfo.metadata.deprecated) {
                fnClass = function () {
                    Log.warning('Usage of deprecated class: ' + sClassName);
                    fnBaseClass.apply(this, arguments);
                };
            } else {
                fnClass = function () {
                    fnBaseClass.apply(this, arguments);
                };
            }
        }
        fnClass.prototype = Object.create(fnBaseClass.prototype);
        fnClass.prototype.constructor = fnClass;
        oClassInfo.metadata.baseType = fnBaseClass.getMetadata().getName();
    } else {
        fnClass = fnClass || function () {
        };
        delete oClassInfo.metadata.baseType;
    }
    oClassInfo.constructor = fnClass;
    ObjectPath.set(sClassName, fnClass);
    var oMetadata = new FNMetaImpl(sClassName, oClassInfo);
    fnClass.getMetadata = fnClass.prototype.getMetadata = function () {
        return oMetadata;
    };
    if (!fnClass.getMetadata().isFinal()) {
        fnClass.extend = function (sSCName, oSCClassInfo, fnSCMetaImpl) {
            return Metadata.createClass(fnClass, sSCName, oSCClassInfo, fnSCMetaImpl || FNMetaImpl);
        };
    }
    return fnClass;
};

var BaseObject$1 = Metadata.createClass('sap.ui.base.Object', {
    constructor: function () {
        if (!(this instanceof BaseObject$1)) {
            throw Error('Cannot instantiate object: "new" is missing!');
        }
    }
});
BaseObject$1.prototype.destroy = function () {
};
BaseObject$1.prototype.getInterface = function () {
    var oInterface = new Interface(this, this.getMetadata().getAllPublicMethods());
    this.getInterface = function () {
        return oInterface;
    };
    return oInterface;
};
BaseObject$1.defineClass = function (sClassName, oStaticInfo, FNMetaImpl) {
    var oMetadata = new (FNMetaImpl || Metadata)(sClassName, oStaticInfo);
    var fnClass = oMetadata.getClass();
    fnClass.getMetadata = fnClass.prototype.getMetadata = function () {
        return oMetadata;
    };
    if (!oMetadata.isFinal()) {
        fnClass.extend = function (sSCName, oSCClassInfo, fnSCMetaImpl) {
            return Metadata.createClass(fnClass, sSCName, oSCClassInfo, fnSCMetaImpl || FNMetaImpl);
        };
    }
    Log.debug('defined class \'' + sClassName + '\'' + (oMetadata.getParent() ? ' as subclass of ' + oMetadata.getParent().getName() : ''));
    return oMetadata;
};
BaseObject$1.prototype.isA = function (vTypeName) {
    return this.getMetadata().isA(vTypeName);
};
BaseObject$1.isA = function (oObject, vTypeName) {
    return oObject instanceof BaseObject$1 && oObject.isA(vTypeName);
};

var CalendarType$1 = {
  Gregorian: "Gregorian",
  Islamic: "Islamic",
  Japanese: "Japanese",
  Persian: "Persian",
  Buddhist: "Buddhist"
};

var rLocale$1 = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
var Locale$1 = BaseObject$1.extend('sap.ui.core.Locale', {
    constructor: function (sLocaleId) {
        BaseObject$1.apply(this);
        var aResult = rLocale$1.exec(sLocaleId.replace(/_/g, '-'));
        if (aResult === null) {
            throw 'The given language \'' + sLocaleId + '\' does not adhere to BCP-47.';
        }
        this.sLocaleId = sLocaleId;
        this.sLanguage = aResult[1] || null;
        this.sScript = aResult[2] || null;
        this.sRegion = aResult[3] || null;
        this.sVariant = aResult[4] && aResult[4].slice(1) || null;
        this.sExtension = aResult[5] && aResult[5].slice(1) || null;
        this.sPrivateUse = aResult[6] || null;
        if (this.sLanguage) {
            this.sLanguage = this.sLanguage.toLowerCase();
        }
        if (this.sScript) {
            this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, function ($) {
                return $.toUpperCase();
            });
        }
        if (this.sRegion) {
            this.sRegion = this.sRegion.toUpperCase();
        }
    },
    getLanguage: function () {
        return this.sLanguage;
    },
    getScript: function () {
        return this.sScript;
    },
    getRegion: function () {
        return this.sRegion;
    },
    getVariant: function () {
        return this.sVariant;
    },
    getVariantSubtags: function () {
        return this.sVariant ? this.sVariant.split('-') : [];
    },
    getExtension: function () {
        return this.sExtension;
    },
    getExtensionSubtags: function () {
        return this.sExtension ? this.sExtension.slice(2).split('-') : [];
    },
    getPrivateUse: function () {
        return this.sPrivateUse;
    },
    getPrivateUseSubtags: function () {
        return this.sPrivateUse ? this.sPrivateUse.slice(2).split('-') : [];
    },
    hasPrivateUseSubtag: function (sSubtag) {
        fnAssert(sSubtag && sSubtag.match(/^[0-9A-Z]{1,8}$/i), 'subtag must be a valid BCP47 private use tag');
        return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
    },
    toString: function () {
        var r = [this.sLanguage];
        if (this.sScript) {
            r.push(this.sScript);
        }
        if (this.sRegion) {
            r.push(this.sRegion);
        }
        if (this.sVariant) {
            r.push(this.sVariant);
        }
        if (this.sExtension) {
            r.push(this.sExtension);
        }
        if (this.sPrivateUse) {
            r.push(this.sPrivateUse);
        }
        return r.join('-');
    },
    getSAPLogonLanguage: function () {
        var sLanguage = this.sLanguage || '', m;
        if (sLanguage.indexOf('-') >= 0) {
            sLanguage = sLanguage.slice(0, sLanguage.indexOf('-'));
        }
        sLanguage = M_ISO639_OLD_TO_NEW$2[sLanguage] || sLanguage;
        if (sLanguage === 'zh') {
            if (this.sScript === 'Hant' || !this.sScript && this.sRegion === 'TW') {
                sLanguage = 'zf';
            }
        }
        if (this.sPrivateUse && (m = /-(saptrc|sappsd)(?:-|$)/i.exec(this.sPrivateUse))) {
            sLanguage = m[1].toLowerCase() === 'saptrc' ? '1Q' : '2Q';
        }
        return sLanguage.toUpperCase();
    }
});
var M_ISO639_OLD_TO_NEW$2 = {
    'iw': 'he',
    'ji': 'yi',
    'in': 'id',
    'sh': 'sr'
};
function getDesigntimePropertyAsArray$1(sValue) {
    var m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(sValue);
    return m && m[2] ? m[2].split(/,/) : null;
}
var A_RTL_LOCALES$1 = getDesigntimePropertyAsArray$1('$cldr-rtl-locales:ar,fa,he$') || [];
Locale$1._cldrLocales = getDesigntimePropertyAsArray$1('$cldr-locales:ar,ar_EG,ar_SA,bg,br,ca,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,kk,ko,lt,lv,ms,nb,nl,nl_BE,nn,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$');
Locale$1._coreI18nLocales = getDesigntimePropertyAsArray$1('$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,kk,ko,lt,lv,ms,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$');
Locale$1._impliesRTL = function (vLanguage) {
    var oLocale = vLanguage instanceof Locale$1 ? vLanguage : new Locale$1(vLanguage);
    var sLanguage = oLocale.getLanguage() || '';
    sLanguage = sLanguage && M_ISO639_OLD_TO_NEW$2[sLanguage] || sLanguage;
    var sRegion = oLocale.getRegion() || '';
    if (sRegion && A_RTL_LOCALES$1.indexOf(sLanguage + '_' + sRegion) >= 0) {
        return true;
    }
    return A_RTL_LOCALES$1.indexOf(sLanguage) >= 0;
};

const LoaderExtensions = {
	loadResource: getModuleContent,
};

var LocaleData = BaseObject$1.extend('sap.ui.core.LocaleData', {
    constructor: function (oLocale) {
        this.oLocale = oLocale;
        BaseObject$1.apply(this);
        this.mData = getData(oLocale);
    },
    _get: function () {
        return this._getDeep(this.mData, arguments);
    },
    _getMerged: function () {
        return this._get.apply(this, arguments);
    },
    _getDeep: function (oObject, aPropertyNames) {
        var oResult = oObject;
        for (var i = 0; i < aPropertyNames.length; i++) {
            oResult = oResult[aPropertyNames[i]];
            if (oResult === undefined) {
                break;
            }
        }
        return oResult;
    },
    getOrientation: function () {
        return this._get('orientation');
    },
    getLanguages: function () {
        return this._get('languages');
    },
    getScripts: function () {
        return this._get('scripts');
    },
    getTerritories: function () {
        return this._get('territories');
    },
    getMonths: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'format', sWidth);
    },
    getMonthsStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'months', 'stand-alone', sWidth);
    },
    getDays: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviate, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'format', sWidth);
    },
    getDaysStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide' || sWidth == 'short', 'sWidth must be narrow, abbreviated, wide or short');
        return this._get(getCLDRCalendarName(sCalendarType), 'days', 'stand-alone', sWidth);
    },
    getQuarters: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'format', sWidth);
    },
    getQuartersStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'quarters', 'stand-alone', sWidth);
    },
    getDayPeriods: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'format', sWidth);
    },
    getDayPeriodsStandAlone: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'narrow' || sWidth == 'abbreviated' || sWidth == 'wide', 'sWidth must be narrow, abbreviated or wide');
        return this._get(getCLDRCalendarName(sCalendarType), 'dayPeriods', 'stand-alone', sWidth);
    },
    getDatePattern: function (sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateFormats', sStyle);
    },
    getTimePattern: function (sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'timeFormats', sStyle);
    },
    getDateTimePattern: function (sStyle, sCalendarType) {
        fnAssert(sStyle == 'short' || sStyle == 'medium' || sStyle == 'long' || sStyle == 'full', 'sStyle must be short, medium, long or full');
        return this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', sStyle);
    },
    getCombinedDateTimePattern: function (sDateStyle, sTimeStyle, sCalendarType) {
        fnAssert(sDateStyle == 'short' || sDateStyle == 'medium' || sDateStyle == 'long' || sDateStyle == 'full', 'sStyle must be short, medium, long or full');
        fnAssert(sTimeStyle == 'short' || sTimeStyle == 'medium' || sTimeStyle == 'long' || sTimeStyle == 'full', 'sStyle must be short, medium, long or full');
        var sDateTimePattern = this.getDateTimePattern(sDateStyle, sCalendarType), sDatePattern = this.getDatePattern(sDateStyle, sCalendarType), sTimePattern = this.getTimePattern(sTimeStyle, sCalendarType);
        return sDateTimePattern.replace('{0}', sTimePattern).replace('{1}', sDatePattern);
    },
    getCustomDateTimePattern: function (sSkeleton, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');
        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType);
    },
    getIntervalPattern: function (sId, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'), aIdParts, sIntervalId, sDifference, oInterval, sPattern;
        if (sId) {
            aIdParts = sId.split('-');
            sIntervalId = aIdParts[0];
            sDifference = aIdParts[1];
            oInterval = oIntervalFormats[sIntervalId];
            if (oInterval) {
                sPattern = oInterval[sDifference];
                if (sPattern) {
                    return sPattern;
                }
            }
        }
        return oIntervalFormats.intervalFormatFallback;
    },
    getCombinedIntervalPattern: function (sPattern, sCalendarType) {
        var oIntervalFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats'), sFallbackPattern = oIntervalFormats.intervalFormatFallback;
        return sFallbackPattern.replace(/\{(0|1)\}/g, sPattern);
    },
    getCustomIntervalPattern: function (sSkeleton, vGreatestDiff, sCalendarType) {
        var oAvailableFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'intervalFormats');
        return this._getFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vGreatestDiff);
    },
    _getFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var vPattern, aPatterns, oIntervalFormats;
        if (!vDiff) {
            vPattern = oAvailableFormats[sSkeleton];
        } else if (typeof vDiff === 'string') {
            if (vDiff == 'j' || vDiff == 'J') {
                vDiff = this.getPreferredHourSymbol();
            }
            oIntervalFormats = oAvailableFormats[sSkeleton];
            vPattern = oIntervalFormats && oIntervalFormats[vDiff];
        }
        if (vPattern) {
            if (typeof vPattern === 'object') {
                aPatterns = Object.keys(vPattern).map(function (sKey) {
                    return vPattern[sKey];
                });
            } else {
                return vPattern;
            }
        }
        if (!aPatterns) {
            aPatterns = this._createFormatPattern(sSkeleton, oAvailableFormats, sCalendarType, vDiff);
        }
        if (aPatterns && aPatterns.length === 1) {
            return aPatterns[0];
        }
        return aPatterns;
    },
    _createFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var aTokens = this._parseSkeletonFormat(sSkeleton), aPatterns, oBestMatch = this._findBestMatch(aTokens, sSkeleton, oAvailableFormats), oToken, oAvailableDateTimeFormats, oSymbol, oGroup, sPattern, sSinglePattern, sDiffSymbol, sDiffGroup, rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/, bSingleDate, i;
        if (vDiff) {
            if (typeof vDiff === 'string') {
                sDiffGroup = mCLDRSymbols[vDiff] ? mCLDRSymbols[vDiff].group : '';
                if (sDiffGroup) {
                    bSingleDate = mCLDRSymbolGroups[sDiffGroup].index > aTokens[aTokens.length - 1].index;
                }
                sDiffSymbol = vDiff;
            } else {
                bSingleDate = true;
                if (aTokens[0].symbol === 'y' && oBestMatch && oBestMatch.pattern.G) {
                    oSymbol = mCLDRSymbols['G'];
                    oGroup = mCLDRSymbolGroups[oSymbol.group];
                    aTokens.splice(0, 0, {
                        symbol: 'G',
                        group: oSymbol.group,
                        match: oSymbol.match,
                        index: oGroup.index,
                        field: oGroup.field,
                        length: 1
                    });
                }
                for (i = aTokens.length - 1; i >= 0; i--) {
                    oToken = aTokens[i];
                    if (vDiff[oToken.group]) {
                        bSingleDate = false;
                        break;
                    }
                }
                for (i = 0; i < aTokens.length; i++) {
                    oToken = aTokens[i];
                    if (vDiff[oToken.group]) {
                        sDiffSymbol = oToken.symbol;
                        break;
                    }
                }
                if ((sDiffSymbol == 'h' || sDiffSymbol == 'K') && vDiff.DayPeriod) {
                    sDiffSymbol = 'a';
                }
            }
            if (bSingleDate) {
                return [this.getCustomDateTimePattern(sSkeleton, sCalendarType)];
            }
            if (oBestMatch && oBestMatch.missingTokens.length === 0) {
                sPattern = oBestMatch.pattern[sDiffSymbol];
                if (sPattern && oBestMatch.distance > 0) {
                    sPattern = this._expandFields(sPattern, oBestMatch.patternTokens, aTokens);
                }
            }
            if (!sPattern) {
                oAvailableDateTimeFormats = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'availableFormats');
                if (rMixedSkeleton.test(sSkeleton) && 'ahHkKjJms'.indexOf(sDiffSymbol) >= 0) {
                    sPattern = this._getMixedFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType, vDiff);
                } else {
                    sSinglePattern = this._getFormatPattern(sSkeleton, oAvailableDateTimeFormats, sCalendarType);
                    sPattern = this.getCombinedIntervalPattern(sSinglePattern, sCalendarType);
                }
            }
            aPatterns = [sPattern];
        } else if (!oBestMatch) {
            sPattern = sSkeleton;
            aPatterns = [sPattern];
        } else {
            if (typeof oBestMatch.pattern === 'string') {
                aPatterns = [oBestMatch.pattern];
            } else if (typeof oBestMatch.pattern === 'object') {
                aPatterns = [];
                for (var sKey in oBestMatch.pattern) {
                    sPattern = oBestMatch.pattern[sKey];
                    aPatterns.push(sPattern);
                }
            }
            if (oBestMatch.distance > 0) {
                if (oBestMatch.missingTokens.length > 0) {
                    if (rMixedSkeleton.test(sSkeleton)) {
                        aPatterns = [this._getMixedFormatPattern(sSkeleton, oAvailableFormats, sCalendarType)];
                    } else {
                        aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
                        aPatterns = this._appendItems(aPatterns, oBestMatch.missingTokens, sCalendarType);
                    }
                } else {
                    aPatterns = this._expandFields(aPatterns, oBestMatch.patternTokens, aTokens);
                }
            }
        }
        if (sSkeleton.indexOf('J') >= 0) {
            aPatterns.forEach(function (sPattern, iIndex) {
                aPatterns[iIndex] = sPattern.replace(/ ?[abB](?=([^']*'[^']*')*[^']*)$/g, '');
            });
        }
        return aPatterns;
    },
    _parseSkeletonFormat: function (sSkeleton) {
        var aTokens = [], oToken = { index: -1 }, sSymbol, oSymbol, oGroup;
        for (var i = 0; i < sSkeleton.length; i++) {
            sSymbol = sSkeleton.charAt(i);
            if (sSymbol == 'j' || sSymbol == 'J') {
                sSymbol = this.getPreferredHourSymbol();
            }
            if (sSymbol == oToken.symbol) {
                oToken.length++;
                continue;
            }
            oSymbol = mCLDRSymbols[sSymbol];
            oGroup = mCLDRSymbolGroups[oSymbol.group];
            if (oSymbol.group == 'Other' || oGroup.diffOnly) {
                throw new Error('Symbol \'' + sSymbol + '\' is not allowed in skeleton format \'' + sSkeleton + '\'');
            }
            if (oGroup.index <= oToken.index) {
                throw new Error('Symbol \'' + sSymbol + '\' at wrong position or duplicate in skeleton format \'' + sSkeleton + '\'');
            }
            oToken = {
                symbol: sSymbol,
                group: oSymbol.group,
                match: oSymbol.match,
                index: oGroup.index,
                field: oGroup.field,
                length: 1
            };
            aTokens.push(oToken);
        }
        return aTokens;
    },
    _findBestMatch: function (aTokens, sSkeleton, oAvailableFormats) {
        var aTestTokens, aMissingTokens, oToken, oTestToken, iTest, iDistance, bMatch, iFirstDiffPos, oTokenSymbol, oTestTokenSymbol, oBestMatch = {
                distance: 10000,
                firstDiffPos: -1
            };
        for (var sTestSkeleton in oAvailableFormats) {
            if (sTestSkeleton === 'intervalFormatFallback' || sTestSkeleton.indexOf('B') > -1) {
                continue;
            }
            aTestTokens = this._parseSkeletonFormat(sTestSkeleton);
            iDistance = 0;
            aMissingTokens = [];
            bMatch = true;
            if (aTokens.length < aTestTokens.length) {
                continue;
            }
            iTest = 0;
            iFirstDiffPos = aTokens.length;
            for (var i = 0; i < aTokens.length; i++) {
                oToken = aTokens[i];
                oTestToken = aTestTokens[iTest];
                if (iFirstDiffPos === aTokens.length) {
                    iFirstDiffPos = i;
                }
                if (oTestToken) {
                    oTokenSymbol = mCLDRSymbols[oToken.symbol];
                    oTestTokenSymbol = mCLDRSymbols[oTestToken.symbol];
                    if (oToken.symbol === oTestToken.symbol) {
                        if (oToken.length === oTestToken.length) {
                            if (iFirstDiffPos === i) {
                                iFirstDiffPos = aTokens.length;
                            }
                        } else {
                            if (oToken.length < oTokenSymbol.numericCeiling ? oTestToken.length < oTestTokenSymbol.numericCeiling : oTestToken.length >= oTestTokenSymbol.numericCeiling) {
                                iDistance += Math.abs(oToken.length - oTestToken.length);
                            } else {
                                iDistance += 5;
                            }
                        }
                        iTest++;
                        continue;
                    } else {
                        if (oToken.match == oTestToken.match) {
                            iDistance += Math.abs(oToken.length - oTestToken.length) + 10;
                            iTest++;
                            continue;
                        }
                    }
                }
                aMissingTokens.push(oToken);
                iDistance += 50 - i;
            }
            if (iTest < aTestTokens.length) {
                bMatch = false;
            }
            if (bMatch && (iDistance < oBestMatch.distance || iDistance === oBestMatch.distance && iFirstDiffPos > oBestMatch.firstDiffPos)) {
                oBestMatch.distance = iDistance;
                oBestMatch.firstDiffPos = iFirstDiffPos;
                oBestMatch.missingTokens = aMissingTokens;
                oBestMatch.pattern = oAvailableFormats[sTestSkeleton];
                oBestMatch.patternTokens = aTestTokens;
            }
        }
        if (oBestMatch.pattern) {
            return oBestMatch;
        }
    },
    _expandFields: function (vPattern, aPatternTokens, aTokens) {
        var bSinglePattern = typeof vPattern === 'string';
        var aPatterns;
        if (bSinglePattern) {
            aPatterns = [vPattern];
        } else {
            aPatterns = vPattern;
        }
        var aResult = aPatterns.map(function (sPattern) {
            var mGroups = {}, mPatternGroups = {}, sResultPatterm = '', bQuoted = false, i = 0, iSkeletonLength, iPatternLength, iBestLength, iNewLength, oSkeletonToken, oBestToken, oSymbol, sChar;
            aTokens.forEach(function (oToken) {
                mGroups[oToken.group] = oToken;
            });
            aPatternTokens.forEach(function (oToken) {
                mPatternGroups[oToken.group] = oToken;
            });
            while (i < sPattern.length) {
                sChar = sPattern.charAt(i);
                if (bQuoted) {
                    sResultPatterm += sChar;
                    if (sChar == '\'') {
                        bQuoted = false;
                    }
                } else {
                    oSymbol = mCLDRSymbols[sChar];
                    if (oSymbol && mGroups[oSymbol.group] && mPatternGroups[oSymbol.group]) {
                        oSkeletonToken = mGroups[oSymbol.group];
                        oBestToken = mPatternGroups[oSymbol.group];
                        iSkeletonLength = oSkeletonToken.length;
                        iBestLength = oBestToken.length;
                        iPatternLength = 1;
                        while (sPattern.charAt(i + 1) == sChar) {
                            i++;
                            iPatternLength++;
                        }
                        if (iSkeletonLength === iBestLength || (iSkeletonLength < oSymbol.numericCeiling ? iPatternLength >= oSymbol.numericCeiling : iPatternLength < oSymbol.numericCeiling)) {
                            iNewLength = iPatternLength;
                        } else {
                            iNewLength = Math.max(iPatternLength, iSkeletonLength);
                        }
                        for (var j = 0; j < iNewLength; j++) {
                            sResultPatterm += sChar;
                        }
                    } else {
                        sResultPatterm += sChar;
                        if (sChar == '\'') {
                            bQuoted = true;
                        }
                    }
                }
                i++;
            }
            return sResultPatterm;
        });
        return bSinglePattern ? aResult[0] : aResult;
    },
    _appendItems: function (aPatterns, aMissingTokens, sCalendarType) {
        var oAppendItems = this._get(getCLDRCalendarName(sCalendarType), 'dateTimeFormats', 'appendItems');
        aPatterns.forEach(function (sPattern, iIndex) {
            var sDisplayName, sAppendPattern, sAppendField;
            aMissingTokens.forEach(function (oToken) {
                sAppendPattern = oAppendItems[oToken.group];
                sDisplayName = '\'' + this.getDisplayName(oToken.field) + '\'';
                sAppendField = '';
                for (var i = 0; i < oToken.length; i++) {
                    sAppendField += oToken.symbol;
                }
                aPatterns[iIndex] = sAppendPattern.replace(/\{0\}/, sPattern).replace(/\{1\}/, sAppendField).replace(/\{2\}/, sDisplayName);
            }.bind(this));
        }.bind(this));
        return aPatterns;
    },
    _getMixedFormatPattern: function (sSkeleton, oAvailableFormats, sCalendarType, vDiff) {
        var rMixedSkeleton = /^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/, rWideMonth = /MMMM|LLLL/, rAbbrevMonth = /MMM|LLL/, rWeekDay = /E|e|c/, oResult, sDateSkeleton, sTimeSkeleton, sStyle, sDatePattern, sTimePattern, sDateTimePattern, sResultPattern;
        oResult = rMixedSkeleton.exec(sSkeleton);
        sDateSkeleton = oResult[1];
        sTimeSkeleton = oResult[2];
        sDatePattern = this._getFormatPattern(sDateSkeleton, oAvailableFormats, sCalendarType);
        if (vDiff) {
            sTimePattern = this.getCustomIntervalPattern(sTimeSkeleton, vDiff, sCalendarType);
        } else {
            sTimePattern = this._getFormatPattern(sTimeSkeleton, oAvailableFormats, sCalendarType);
        }
        if (rWideMonth.test(sDateSkeleton)) {
            sStyle = rWeekDay.test(sDateSkeleton) ? 'full' : 'long';
        } else if (rAbbrevMonth.test(sDateSkeleton)) {
            sStyle = 'medium';
        } else {
            sStyle = 'short';
        }
        sDateTimePattern = this.getDateTimePattern(sStyle, sCalendarType);
        sResultPattern = sDateTimePattern.replace(/\{1\}/, sDatePattern).replace(/\{0\}/, sTimePattern);
        return sResultPattern;
    },
    getNumberSymbol: function (sType) {
        fnAssert(sType == 'decimal' || sType == 'group' || sType == 'plusSign' || sType == 'minusSign' || sType == 'percentSign', 'sType must be decimal, group, plusSign, minusSign or percentSign');
        return this._get('symbols-latn-' + sType);
    },
    getLenientNumberSymbols: function (sType) {
        fnAssert(sType == 'plusSign' || sType == 'minusSign', 'sType must be plusSign or minusSign');
        return this._get('lenient-scope-number')[sType];
    },
    getDecimalPattern: function () {
        return this._get('decimalFormat').standard;
    },
    getCurrencyPattern: function (sContext) {
        return this._get('currencyFormat')[sContext] || this._get('currencyFormat').standard;
    },
    getCurrencySpacing: function (sPosition) {
        return this._get('currencyFormat', 'currencySpacing', sPosition === 'after' ? 'afterCurrency' : 'beforeCurrency');
    },
    getPercentPattern: function () {
        return this._get('percentFormat').standard;
    },
    getMiscPattern: function (sName) {
        fnAssert(sName == 'approximately' || sName == 'atLeast' || sName == 'atMost' || sName == 'range', 'sName must be approximately, atLeast, atMost or range');
        return this._get('miscPattern')[sName];
    },
    getMinimalDaysInFirstWeek: function () {
        return this._get('weekData-minDays');
    },
    getFirstDayOfWeek: function () {
        return this._get('weekData-firstDay');
    },
    getWeekendStart: function () {
        return this._get('weekData-weekendStart');
    },
    getWeekendEnd: function () {
        return this._get('weekData-weekendEnd');
    },
    getCustomCurrencyCodes: function () {
        var mCustomCurrencies = this._get('currency') || {}, mCustomCurrencyCodes = {};
        Object.keys(mCustomCurrencies).forEach(function (sCurrencyKey) {
            mCustomCurrencyCodes[sCurrencyKey] = sCurrencyKey;
        });
        return mCustomCurrencyCodes;
    },
    getCurrencyDigits: function (sCurrency) {
        var mCustomCurrencies = this._get('currency');
        if (mCustomCurrencies) {
            if (mCustomCurrencies[sCurrency] && mCustomCurrencies[sCurrency].hasOwnProperty('digits')) {
                return mCustomCurrencies[sCurrency].digits;
            } else if (mCustomCurrencies['DEFAULT'] && mCustomCurrencies['DEFAULT'].hasOwnProperty('digits')) {
                return mCustomCurrencies['DEFAULT'].digits;
            }
        }
        var iDigits = this._get('currencyDigits', sCurrency);
        if (iDigits == null) {
            iDigits = this._get('currencyDigits', 'DEFAULT');
            if (iDigits == null) {
                iDigits = 2;
            }
        }
        return iDigits;
    },
    getCurrencySymbol: function (sCurrency) {
        var oCurrencySymbols = this.getCurrencySymbols();
        return oCurrencySymbols && oCurrencySymbols[sCurrency] || sCurrency;
    },
    getCurrencyCodeBySymbol: function (sCurrencySymbol) {
        var oCurrencySymbols = this._get('currencySymbols'), sCurrencyCode;
        for (sCurrencyCode in oCurrencySymbols) {
            if (oCurrencySymbols[sCurrencyCode] === sCurrencySymbol) {
                return sCurrencyCode;
            }
        }
        return sCurrencySymbol;
    },
    getCurrencySymbols: function () {
        var mCustomCurrencies = this._get('currency'), mCustomCurrencySymbols = {}, sIsoCode;
        for (var sCurrencyKey in mCustomCurrencies) {
            sIsoCode = mCustomCurrencies[sCurrencyKey].isoCode;
            if (mCustomCurrencies[sCurrencyKey].symbol) {
                mCustomCurrencySymbols[sCurrencyKey] = mCustomCurrencies[sCurrencyKey].symbol;
            } else if (sIsoCode) {
                mCustomCurrencySymbols[sCurrencyKey] = this._get('currencySymbols')[sIsoCode];
            }
        }
        return Object.assign({}, this._get('currencySymbols'), mCustomCurrencySymbols);
    },
    getUnitDisplayName: function (sUnit) {
        var mUnitFormat = this.getUnitFormat(sUnit);
        return mUnitFormat && mUnitFormat['displayName'] || '';
    },
    getRelativePatterns: function (aScales, sStyle) {
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aPatterns = [], aPluralCategories = this.getPluralCategories(), oScale, oTimeEntry, iValue, iSign;
        if (!aScales) {
            aScales = [
                'year',
                'month',
                'week',
                'day',
                'hour',
                'minute',
                'second'
            ];
        }
        aScales.forEach(function (sScale) {
            oScale = this._get('dateFields', sScale + '-' + sStyle);
            for (var sEntry in oScale) {
                if (sEntry.indexOf('relative-type-') === 0) {
                    iValue = parseInt(sEntry.substr(14));
                    aPatterns.push({
                        scale: sScale,
                        value: iValue,
                        pattern: oScale[sEntry]
                    });
                } else if (sEntry.indexOf('relativeTime-type-') == 0) {
                    oTimeEntry = oScale[sEntry];
                    iSign = sEntry.substr(18) === 'past' ? -1 : 1;
                    aPluralCategories.forEach(function (sKey) {
                        aPatterns.push({
                            scale: sScale,
                            sign: iSign,
                            pattern: oTimeEntry['relativeTimePattern-count-' + sKey]
                        });
                    });
                }
            }
        }.bind(this));
        return aPatterns;
    },
    getRelativePattern: function (sScale, iDiff, bFuture, sStyle) {
        var sPattern, oTypes, sKey, sPluralCategory;
        if (typeof bFuture === 'string') {
            sStyle = bFuture;
            bFuture = undefined;
        }
        if (bFuture === undefined) {
            bFuture = iDiff > 0;
        }
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        sKey = sScale + '-' + sStyle;
        if (iDiff === 0 || iDiff === -2 || iDiff === 2) {
            sPattern = this._get('dateFields', sKey, 'relative-type-' + iDiff);
        }
        if (!sPattern) {
            oTypes = this._get('dateFields', sKey, 'relativeTime-type-' + (bFuture ? 'future' : 'past'));
            sPluralCategory = this.getPluralCategory(Math.abs(iDiff).toString());
            sPattern = oTypes['relativeTimePattern-count-' + sPluralCategory];
        }
        return sPattern;
    },
    getRelativeSecond: function (iDiff, sStyle) {
        return this.getRelativePattern('second', iDiff, sStyle);
    },
    getRelativeMinute: function (iDiff, sStyle) {
        if (iDiff == 0) {
            return null;
        }
        return this.getRelativePattern('minute', iDiff, sStyle);
    },
    getRelativeHour: function (iDiff, sStyle) {
        if (iDiff == 0) {
            return null;
        }
        return this.getRelativePattern('hour', iDiff, sStyle);
    },
    getRelativeDay: function (iDiff, sStyle) {
        return this.getRelativePattern('day', iDiff, sStyle);
    },
    getRelativeWeek: function (iDiff, sStyle) {
        return this.getRelativePattern('week', iDiff, sStyle);
    },
    getRelativeMonth: function (iDiff, sStyle) {
        return this.getRelativePattern('month', iDiff, sStyle);
    },
    getDisplayName: function (sType, sStyle) {
        fnAssert(sType == 'second' || sType == 'minute' || sType == 'hour' || sType == 'zone' || sType == 'day' || sType == 'weekday' || sType == 'week' || sType == 'month' || sType == 'quarter' || sType == 'year' || sType == 'era', 'sType must be second, minute, hour, zone, day, weekday, week, month, quarter, year, era');
        if (sStyle === undefined) {
            sStyle = 'wide';
        }
        fnAssert(sStyle === 'wide' || sStyle === 'short' || sStyle === 'narrow', 'sStyle is only allowed to be set with \'wide\', \'short\' or \'narrow\'');
        var aSingleFormFields = [
                'era',
                'weekday',
                'zone'
            ], sKey = aSingleFormFields.indexOf(sType) === -1 ? sType + '-' + sStyle : sType;
        return this._get('dateFields', sKey, 'displayName');
    },
    getRelativeYear: function (iDiff, sStyle) {
        return this.getRelativePattern('year', iDiff, sStyle);
    },
    getDecimalFormat: function (sStyle, sNumber, sPlural) {
        var sFormat;
        var oFormats;
        switch (sStyle) {
        case 'long':
            oFormats = this._get('decimalFormat-long');
            break;
        default:
            oFormats = this._get('decimalFormat-short');
            break;
        }
        if (oFormats) {
            var sName = sNumber + '-' + sPlural;
            sFormat = oFormats[sName];
            if (!sFormat) {
                sName = sNumber + '-other';
                sFormat = oFormats[sName];
            }
        }
        return sFormat;
    },
    getCurrencyFormat: function (sStyle, sNumber, sPlural) {
        var sFormat;
        var oFormats = this._get('currencyFormat-' + sStyle);
        if (!oFormats) {
            if (sStyle === 'sap-short') {
                throw new Error('Failed to get CLDR data for property "currencyFormat-sap-short"');
            }
            oFormats = this._get('currencyFormat-short');
        }
        if (oFormats) {
            var sName = sNumber + '-' + sPlural;
            sFormat = oFormats[sName];
            if (!sFormat) {
                sName = sNumber + '-other';
                sFormat = oFormats[sName];
            }
        }
        return sFormat;
    },
    getListFormat: function (sType, sStyle) {
        var oFormats = this._get('listPattern-' + (sType || 'standard') + '-' + (sStyle || 'wide'));
        if (oFormats) {
            return oFormats;
        }
        return {};
    },
    getResolvedUnitFormat: function (sUnit) {
        sUnit = this.getUnitFromMapping(sUnit) || sUnit;
        return this.getUnitFormat(sUnit);
    },
    getUnitFormat: function (sUnit) {
        return this._get('units', 'short', sUnit);
    },
    getUnitFormats: function () {
        return this._getMerged('units', 'short');
    },
    getUnitFromMapping: function (sMapping) {
        return this._get('unitMappings', sMapping);
    },
    getEras: function (sWidth, sCalendarType) {
        fnAssert(sWidth == 'wide' || sWidth == 'abbreviated' || sWidth == 'narrow', 'sWidth must be wide, abbreviate or narrow');
        var oEras = this._get(getCLDRCalendarName(sCalendarType), 'era-' + sWidth), aEras = [];
        for (var i in oEras) {
            aEras[parseInt(i)] = oEras[i];
        }
        return aEras;
    },
    getEraDates: function (sCalendarType) {
        var oEraDates = this._get('eras-' + sCalendarType.toLowerCase()), aEraDates = [];
        for (var i in oEraDates) {
            aEraDates[parseInt(i)] = oEraDates[i];
        }
        return aEraDates;
    },
    getCalendarWeek: function (sStyle, iWeekNumber) {
        fnAssert(sStyle == 'wide' || sStyle == 'narrow', 'sStyle must be wide or narrow');
        var oMessageBundle = Core.getLibraryResourceBundle('sap.ui.core', this.oLocale.toString()), sKey = 'date.week.calendarweek.' + sStyle;
        return oMessageBundle.getText(sKey, iWeekNumber);
    },
    getPreferredCalendarType: function () {
        var sCalendarPreference = this._get('calendarPreference'), aCalendars = sCalendarPreference ? sCalendarPreference.split(' ') : [], sCalendarName, sType, i;
        for (i = 0; i < aCalendars.length; i++) {
            sCalendarName = aCalendars[i].split('-')[0];
            for (sType in CalendarType$1) {
                if (sCalendarName === sType.toLowerCase()) {
                    return sType;
                }
            }
        }
        return CalendarType$1.Gregorian;
    },
    getPreferredHourSymbol: function () {
        return this._get('timeData', '_preferred');
    },
    getPluralCategories: function () {
        var oPlurals = this._get('plurals'), aCategories = Object.keys(oPlurals);
        aCategories.push('other');
        return aCategories;
    },
    getPluralCategory: function (sNumber) {
        var oPlurals = this._get('plurals');
        if (typeof sNumber === 'number') {
            sNumber = sNumber.toString();
        }
        if (!this._pluralTest) {
            this._pluralTest = {};
        }
        for (var sCategory in oPlurals) {
            var fnTest = this._pluralTest[sCategory];
            if (!fnTest) {
                fnTest = this._parsePluralRule(oPlurals[sCategory]);
                this._pluralTest[sCategory] = fnTest;
            }
            if (fnTest(sNumber)) {
                return sCategory;
            }
        }
        return 'other';
    },
    _parsePluralRule: function (sRule) {
        var OP_OR = 'or', OP_AND = 'and', OP_MOD = '%', OP_EQ = '=', OP_NEQ = '!=', OPD_N = 'n', OPD_I = 'i', OPD_F = 'f', OPD_T = 't', OPD_V = 'v', OPD_W = 'w', RANGE = '..', SEP = ',';
        var i = 0, aTokens;
        aTokens = sRule.split(' ');
        function accept(sToken) {
            if (aTokens[i] === sToken) {
                i++;
                return true;
            }
            return false;
        }
        function consume() {
            var sToken = aTokens[i];
            i++;
            return sToken;
        }
        function or_condition() {
            var fnAnd, fnOr;
            fnAnd = and_condition();
            if (accept(OP_OR)) {
                fnOr = or_condition();
                return function (o) {
                    return fnAnd(o) || fnOr(o);
                };
            }
            return fnAnd;
        }
        function and_condition() {
            var fnRelation, fnAnd;
            fnRelation = relation();
            if (accept(OP_AND)) {
                fnAnd = and_condition();
                return function (o) {
                    return fnRelation(o) && fnAnd(o);
                };
            }
            return fnRelation;
        }
        function relation() {
            var fnExpr, fnRangeList, bEq;
            fnExpr = expr();
            if (accept(OP_EQ)) {
                bEq = true;
            } else if (accept(OP_NEQ)) {
                bEq = false;
            } else {
                throw new Error('Expected \'=\' or \'!=\'');
            }
            fnRangeList = range_list();
            if (bEq) {
                return function (o) {
                    return fnRangeList(o).indexOf(fnExpr(o)) >= 0;
                };
            } else {
                return function (o) {
                    return fnRangeList(o).indexOf(fnExpr(o)) === -1;
                };
            }
        }
        function expr() {
            var fnOperand;
            fnOperand = operand();
            if (accept(OP_MOD)) {
                var iDivisor = parseInt(consume());
                return function (o) {
                    return fnOperand(o) % iDivisor;
                };
            }
            return fnOperand;
        }
        function operand() {
            if (accept(OPD_N)) {
                return function (o) {
                    return o.n;
                };
            } else if (accept(OPD_I)) {
                return function (o) {
                    return o.i;
                };
            } else if (accept(OPD_F)) {
                return function (o) {
                    return o.f;
                };
            } else if (accept(OPD_T)) {
                return function (o) {
                    return o.t;
                };
            } else if (accept(OPD_V)) {
                return function (o) {
                    return o.v;
                };
            } else if (accept(OPD_W)) {
                return function (o) {
                    return o.w;
                };
            } else {
                throw new Error('Unknown operand: ' + consume());
            }
        }
        function range_list() {
            var aValues = [], sRangeList = consume(), aParts = sRangeList.split(SEP), aRange, iFrom, iTo;
            aParts.forEach(function (sPart) {
                aRange = sPart.split(RANGE);
                if (aRange.length === 1) {
                    aValues.push(parseInt(sPart));
                } else {
                    iFrom = parseInt(aRange[0]);
                    iTo = parseInt(aRange[1]);
                    for (var i = iFrom; i <= iTo; i++) {
                        aValues.push(i);
                    }
                }
            });
            return function (o) {
                return aValues;
            };
        }
        var fnOr = or_condition();
        if (i != aTokens.length) {
            throw new Error('Not completely parsed');
        }
        return function (sValue) {
            var iDotPos = sValue.indexOf('.'), sDecimal, sFraction, sFractionNoZeros, o;
            if (iDotPos === -1) {
                sDecimal = sValue;
                sFraction = '';
                sFractionNoZeros = '';
            } else {
                sDecimal = sValue.substr(0, iDotPos);
                sFraction = sValue.substr(iDotPos + 1);
                sFractionNoZeros = sFraction.replace(/0+$/, '');
            }
            o = {
                n: parseFloat(sValue),
                i: parseInt(sDecimal),
                v: sFraction.length,
                w: sFractionNoZeros.length,
                f: parseInt(sFraction),
                t: parseInt(sFractionNoZeros)
            };
            return fnOr(o);
        };
    }
});
var mCLDRSymbolGroups = {
    'Era': {
        field: 'era',
        index: 0
    },
    'Year': {
        field: 'year',
        index: 1
    },
    'Quarter': {
        field: 'quarter',
        index: 2
    },
    'Month': {
        field: 'month',
        index: 3
    },
    'Week': {
        field: 'week',
        index: 4
    },
    'Day-Of-Week': {
        field: 'weekday',
        index: 5
    },
    'Day': {
        field: 'day',
        index: 6
    },
    'DayPeriod': {
        field: 'hour',
        index: 7,
        diffOnly: true
    },
    'Hour': {
        field: 'hour',
        index: 8
    },
    'Minute': {
        field: 'minute',
        index: 9
    },
    'Second': {
        field: 'second',
        index: 10
    },
    'Timezone': {
        field: 'zone',
        index: 11
    }
};
var mCLDRSymbols = {
    'G': {
        group: 'Era',
        match: 'Era',
        numericCeiling: 1
    },
    'y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
    },
    'Y': {
        group: 'Year',
        match: 'Year',
        numericCeiling: 100
    },
    'Q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
    },
    'q': {
        group: 'Quarter',
        match: 'Quarter',
        numericCeiling: 3
    },
    'M': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
    },
    'L': {
        group: 'Month',
        match: 'Month',
        numericCeiling: 3
    },
    'w': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
    },
    'W': {
        group: 'Week',
        match: 'Week',
        numericCeiling: 100
    },
    'd': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
    },
    'D': {
        group: 'Day',
        match: 'Day',
        numericCeiling: 100
    },
    'E': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 1
    },
    'e': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 3
    },
    'c': {
        group: 'Day-Of-Week',
        match: 'Day-Of-Week',
        numericCeiling: 2
    },
    'h': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
    },
    'H': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
    },
    'k': {
        group: 'Hour',
        match: 'Hour24',
        numericCeiling: 100
    },
    'K': {
        group: 'Hour',
        match: 'Hour12',
        numericCeiling: 100
    },
    'm': {
        group: 'Minute',
        match: 'Minute',
        numericCeiling: 100
    },
    's': {
        group: 'Second',
        match: 'Second',
        numericCeiling: 100
    },
    'z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'Z': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'O': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'v': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'V': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'X': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'x': {
        group: 'Timezone',
        match: 'Timezone',
        numericCeiling: 1
    },
    'S': {
        group: 'Other',
        numericCeiling: 100
    },
    'u': {
        group: 'Other',
        numericCeiling: 100
    },
    'U': {
        group: 'Other',
        numericCeiling: 1
    },
    'r': {
        group: 'Other',
        numericCeiling: 100
    },
    'F': {
        group: 'Other',
        numericCeiling: 100
    },
    'g': {
        group: 'Other',
        numericCeiling: 100
    },
    'a': {
        group: 'DayPeriod',
        numericCeiling: 1
    },
    'b': {
        group: 'Other',
        numericCeiling: 1
    },
    'B': {
        group: 'Other',
        numericCeiling: 1
    },
    'A': {
        group: 'Other',
        numericCeiling: 100
    }
};
var M_DEFAULT_DATA = {
    'orientation': 'left-to-right',
    'languages': {},
    'scripts': {},
    'territories': {},
    'ca-gregorian': {
        'dateFormats': {
            'full': 'EEEE, MMMM d, y',
            'long': 'MMMM d, y',
            'medium': 'MMM d, y',
            'short': 'M/d/yy'
        },
        'timeFormats': {
            'full': 'h:mm:ss a zzzz',
            'long': 'h:mm:ss a z',
            'medium': 'h:mm:ss a',
            'short': 'h:mm a'
        },
        'dateTimeFormats': {
            'full': '{1} \'at\' {0}',
            'long': '{1} \'at\' {0}',
            'medium': '{1}, {0}',
            'short': '{1}, {0}',
            'availableFormats': {
                'd': 'd',
                'E': 'ccc',
                'Ed': 'd E',
                'Ehm': 'E h:mm a',
                'EHm': 'E HH:mm',
                'Ehms': 'E h:mm:ss a',
                'EHms': 'E HH:mm:ss',
                'Gy': 'y G',
                'GyMMM': 'MMM y G',
                'GyMMMd': 'MMM d, y G',
                'GyMMMEd': 'E, MMM d, y G',
                'h': 'h a',
                'H': 'HH',
                'hm': 'h:mm a',
                'Hm': 'HH:mm',
                'hms': 'h:mm:ss a',
                'Hms': 'HH:mm:ss',
                'hmsv': 'h:mm:ss a v',
                'Hmsv': 'HH:mm:ss v',
                'hmv': 'h:mm a v',
                'Hmv': 'HH:mm v',
                'M': 'L',
                'Md': 'M/d',
                'MEd': 'E, M/d',
                'MMM': 'LLL',
                'MMMd': 'MMM d',
                'MMMEd': 'E, MMM d',
                'MMMMd': 'MMMM d',
                'ms': 'mm:ss',
                'y': 'y',
                'yM': 'M/y',
                'yMd': 'M/d/y',
                'yMEd': 'E, M/d/y',
                'yMMM': 'MMM y',
                'yMMMd': 'MMM d, y',
                'yMMMEd': 'E, MMM d, y',
                'yMMMM': 'MMMM y',
                'yQQQ': 'QQQ y',
                'yQQQQ': 'QQQQ y'
            },
            'appendItems': {
                'Day': '{0} ({2}: {1})',
                'Day-Of-Week': '{0} {1}',
                'Era': '{0} {1}',
                'Hour': '{0} ({2}: {1})',
                'Minute': '{0} ({2}: {1})',
                'Month': '{0} ({2}: {1})',
                'Quarter': '{0} ({2}: {1})',
                'Second': '{0} ({2}: {1})',
                'Timezone': '{0} {1}',
                'Week': '{0} ({2}: {1})',
                'Year': '{0} {1}'
            },
            'intervalFormats': {
                'intervalFormatFallback': '{0} \u2013 {1}',
                'd': { 'd': 'd \u2013 d' },
                'h': {
                    'a': 'h a \u2013 h a',
                    'h': 'h \u2013 h a'
                },
                'H': { 'H': 'HH \u2013 HH' },
                'hm': {
                    'a': 'h:mm a \u2013 h:mm a',
                    'h': 'h:mm \u2013 h:mm a',
                    'm': 'h:mm \u2013 h:mm a'
                },
                'Hm': {
                    'H': 'HH:mm \u2013 HH:mm',
                    'm': 'HH:mm \u2013 HH:mm'
                },
                'hmv': {
                    'a': 'h:mm a \u2013 h:mm a v',
                    'h': 'h:mm \u2013 h:mm a v',
                    'm': 'h:mm \u2013 h:mm a v'
                },
                'Hmv': {
                    'H': 'HH:mm \u2013 HH:mm v',
                    'm': 'HH:mm \u2013 HH:mm v'
                },
                'hv': {
                    'a': 'h a \u2013 h a v',
                    'h': 'h \u2013 h a v'
                },
                'Hv': { 'H': 'HH \u2013 HH v' },
                'M': { 'M': 'M \u2013 M' },
                'Md': {
                    'd': 'M/d \u2013 M/d',
                    'M': 'M/d \u2013 M/d'
                },
                'MEd': {
                    'd': 'E, M/d \u2013 E, M/d',
                    'M': 'E, M/d \u2013 E, M/d'
                },
                'MMM': { 'M': 'MMM \u2013 MMM' },
                'MMMd': {
                    'd': 'MMM d \u2013 d',
                    'M': 'MMM d \u2013 MMM d'
                },
                'MMMEd': {
                    'd': 'E, MMM d \u2013 E, MMM d',
                    'M': 'E, MMM d \u2013 E, MMM d'
                },
                'y': { 'y': 'y \u2013 y' },
                'yM': {
                    'M': 'M/y \u2013 M/y',
                    'y': 'M/y \u2013 M/y'
                },
                'yMd': {
                    'd': 'M/d/y \u2013 M/d/y',
                    'M': 'M/d/y \u2013 M/d/y',
                    'y': 'M/d/y \u2013 M/d/y'
                },
                'yMEd': {
                    'd': 'E, M/d/y \u2013 E, M/d/y',
                    'M': 'E, M/d/y \u2013 E, M/d/y',
                    'y': 'E, M/d/y \u2013 E, M/d/y'
                },
                'yMMM': {
                    'M': 'MMM \u2013 MMM y',
                    'y': 'MMM y \u2013 MMM y'
                },
                'yMMMd': {
                    'd': 'MMM d \u2013 d, y',
                    'M': 'MMM d \u2013 MMM d, y',
                    'y': 'MMM d, y \u2013 MMM d, y'
                },
                'yMMMEd': {
                    'd': 'E, MMM d \u2013 E, MMM d, y',
                    'M': 'E, MMM d \u2013 E, MMM d, y',
                    'y': 'E, MMM d, y \u2013 E, MMM d, y'
                },
                'yMMMM': {
                    'M': 'MMMM \u2013 MMMM y',
                    'y': 'MMMM y \u2013 MMMM y'
                }
            }
        },
        'months': {
            'format': {
                'abbreviated': [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                'narrow': [
                    'J',
                    'F',
                    'M',
                    'A',
                    'M',
                    'J',
                    'J',
                    'A',
                    'S',
                    'O',
                    'N',
                    'D'
                ],
                'wide': [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ]
            },
            'stand-alone': {
                'abbreviated': [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                'narrow': [
                    'J',
                    'F',
                    'M',
                    'A',
                    'M',
                    'J',
                    'J',
                    'A',
                    'S',
                    'O',
                    'N',
                    'D'
                ],
                'wide': [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ]
            }
        },
        'days': {
            'format': {
                'abbreviated': [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat'
                ],
                'narrow': [
                    'S',
                    'M',
                    'T',
                    'W',
                    'T',
                    'F',
                    'S'
                ],
                'short': [
                    'Su',
                    'Mo',
                    'Tu',
                    'We',
                    'Th',
                    'Fr',
                    'Sa'
                ],
                'wide': [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ]
            },
            'stand-alone': {
                'abbreviated': [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat'
                ],
                'narrow': [
                    'S',
                    'M',
                    'T',
                    'W',
                    'T',
                    'F',
                    'S'
                ],
                'short': [
                    'Su',
                    'Mo',
                    'Tu',
                    'We',
                    'Th',
                    'Fr',
                    'Sa'
                ],
                'wide': [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ]
            }
        },
        'quarters': {
            'format': {
                'abbreviated': [
                    'Q1',
                    'Q2',
                    'Q3',
                    'Q4'
                ],
                'narrow': [
                    '1',
                    '2',
                    '3',
                    '4'
                ],
                'wide': [
                    '1st quarter',
                    '2nd quarter',
                    '3rd quarter',
                    '4th quarter'
                ]
            },
            'stand-alone': {
                'abbreviated': [
                    'Q1',
                    'Q2',
                    'Q3',
                    'Q4'
                ],
                'narrow': [
                    '1',
                    '2',
                    '3',
                    '4'
                ],
                'wide': [
                    '1st quarter',
                    '2nd quarter',
                    '3rd quarter',
                    '4th quarter'
                ]
            }
        },
        'dayPeriods': {
            'format': {
                'abbreviated': [
                    'AM',
                    'PM'
                ],
                'narrow': [
                    'a',
                    'p'
                ],
                'wide': [
                    'AM',
                    'PM'
                ]
            },
            'stand-alone': {
                'abbreviated': [
                    'AM',
                    'PM'
                ],
                'narrow': [
                    'AM',
                    'PM'
                ],
                'wide': [
                    'AM',
                    'PM'
                ]
            }
        },
        'era-wide': {
            '0': 'Before Christ',
            '1': 'Anno Domini'
        },
        'era-abbreviated': {
            '0': 'BC',
            '1': 'AD'
        },
        'era-narrow': {
            '0': 'B',
            '1': 'A'
        }
    },
    'eras-gregorian': {
        '0': { '_end': '0-12-31' },
        '1': { '_start': '1-01-01' }
    },
    'dateFields': {
        'era': { 'displayName': 'era' },
        'year-wide': {
            'displayName': 'year',
            'relative-type--1': 'last year',
            'relative-type-0': 'this year',
            'relative-type-1': 'next year',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} year',
                'relativeTimePattern-count-other': 'in {0} years'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} year ago',
                'relativeTimePattern-count-other': '{0} years ago'
            }
        },
        'year-short': {
            'displayName': 'yr.',
            'relative-type--1': 'last yr.',
            'relative-type-0': 'this yr.',
            'relative-type-1': 'next yr.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} yr.',
                'relativeTimePattern-count-other': 'in {0} yr.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} yr. ago',
                'relativeTimePattern-count-other': '{0} yr. ago'
            }
        },
        'year-narrow': {
            'displayName': 'yr.',
            'relative-type--1': 'last yr.',
            'relative-type-0': 'this yr.',
            'relative-type-1': 'next yr.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} yr.',
                'relativeTimePattern-count-other': 'in {0} yr.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} yr. ago',
                'relativeTimePattern-count-other': '{0} yr. ago'
            }
        },
        'quarter-wide': {
            'displayName': 'quarter',
            'relative-type--1': 'last quarter',
            'relative-type-0': 'this quarter',
            'relative-type-1': 'next quarter',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} quarter',
                'relativeTimePattern-count-other': 'in {0} quarters'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} quarter ago',
                'relativeTimePattern-count-other': '{0} quarters ago'
            }
        },
        'quarter-short': {
            'displayName': 'qtr.',
            'relative-type--1': 'last qtr.',
            'relative-type-0': 'this qtr.',
            'relative-type-1': 'next qtr.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} qtr.',
                'relativeTimePattern-count-other': 'in {0} qtrs.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} qtr. ago',
                'relativeTimePattern-count-other': '{0} qtrs. ago'
            }
        },
        'quarter-narrow': {
            'displayName': 'qtr.',
            'relative-type--1': 'last qtr.',
            'relative-type-0': 'this qtr.',
            'relative-type-1': 'next qtr.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} qtr.',
                'relativeTimePattern-count-other': 'in {0} qtrs.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} qtr. ago',
                'relativeTimePattern-count-other': '{0} qtrs. ago'
            }
        },
        'month-wide': {
            'displayName': 'month',
            'relative-type--1': 'last month',
            'relative-type-0': 'this month',
            'relative-type-1': 'next month',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} month',
                'relativeTimePattern-count-other': 'in {0} months'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} month ago',
                'relativeTimePattern-count-other': '{0} months ago'
            }
        },
        'month-short': {
            'displayName': 'mo.',
            'relative-type--1': 'last mo.',
            'relative-type-0': 'this mo.',
            'relative-type-1': 'next mo.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} mo.',
                'relativeTimePattern-count-other': 'in {0} mo.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} mo. ago',
                'relativeTimePattern-count-other': '{0} mo. ago'
            }
        },
        'month-narrow': {
            'displayName': 'mo.',
            'relative-type--1': 'last mo.',
            'relative-type-0': 'this mo.',
            'relative-type-1': 'next mo.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} mo.',
                'relativeTimePattern-count-other': 'in {0} mo.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} mo. ago',
                'relativeTimePattern-count-other': '{0} mo. ago'
            }
        },
        'week-wide': {
            'displayName': 'week',
            'relative-type--1': 'last week',
            'relative-type-0': 'this week',
            'relative-type-1': 'next week',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} week',
                'relativeTimePattern-count-other': 'in {0} weeks'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} week ago',
                'relativeTimePattern-count-other': '{0} weeks ago'
            },
            'relativePeriod': 'the week of {0}'
        },
        'week-short': {
            'displayName': 'wk.',
            'relative-type--1': 'last wk.',
            'relative-type-0': 'this wk.',
            'relative-type-1': 'next wk.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} wk.',
                'relativeTimePattern-count-other': 'in {0} wk.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} wk. ago',
                'relativeTimePattern-count-other': '{0} wk. ago'
            },
            'relativePeriod': 'the week of {0}'
        },
        'week-narrow': {
            'displayName': 'wk.',
            'relative-type--1': 'last wk.',
            'relative-type-0': 'this wk.',
            'relative-type-1': 'next wk.',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} wk.',
                'relativeTimePattern-count-other': 'in {0} wk.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} wk. ago',
                'relativeTimePattern-count-other': '{0} wk. ago'
            },
            'relativePeriod': 'the week of {0}'
        },
        'day-wide': {
            'displayName': 'day',
            'relative-type--1': 'yesterday',
            'relative-type-0': 'today',
            'relative-type-1': 'tomorrow',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} day',
                'relativeTimePattern-count-other': 'in {0} days'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} day ago',
                'relativeTimePattern-count-other': '{0} days ago'
            }
        },
        'day-short': {
            'displayName': 'day',
            'relative-type--1': 'yesterday',
            'relative-type-0': 'today',
            'relative-type-1': 'tomorrow',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} day',
                'relativeTimePattern-count-other': 'in {0} days'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} day ago',
                'relativeTimePattern-count-other': '{0} days ago'
            }
        },
        'day-narrow': {
            'displayName': 'day',
            'relative-type--1': 'yesterday',
            'relative-type-0': 'today',
            'relative-type-1': 'tomorrow',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} day',
                'relativeTimePattern-count-other': 'in {0} days'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} day ago',
                'relativeTimePattern-count-other': '{0} days ago'
            }
        },
        'weekday': { 'displayName': 'day of the week' },
        'hour-wide': {
            'displayName': 'hour',
            'relative-type-0': 'this hour',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} hour',
                'relativeTimePattern-count-other': 'in {0} hours'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} hour ago',
                'relativeTimePattern-count-other': '{0} hours ago'
            }
        },
        'hour-short': {
            'displayName': 'hr.',
            'relative-type-0': 'this hour',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} hr.',
                'relativeTimePattern-count-other': 'in {0} hr.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} hr. ago',
                'relativeTimePattern-count-other': '{0} hr. ago'
            }
        },
        'hour-narrow': {
            'displayName': 'hr.',
            'relative-type-0': 'this hour',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} hr.',
                'relativeTimePattern-count-other': 'in {0} hr.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} hr. ago',
                'relativeTimePattern-count-other': '{0} hr. ago'
            }
        },
        'minute-wide': {
            'displayName': 'minute',
            'relative-type-0': 'this minute',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} minute',
                'relativeTimePattern-count-other': 'in {0} minutes'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} minute ago',
                'relativeTimePattern-count-other': '{0} minutes ago'
            }
        },
        'minute-short': {
            'displayName': 'min.',
            'relative-type-0': 'this minute',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} min.',
                'relativeTimePattern-count-other': 'in {0} min.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} min. ago',
                'relativeTimePattern-count-other': '{0} min. ago'
            }
        },
        'minute-narrow': {
            'displayName': 'min.',
            'relative-type-0': 'this minute',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} min.',
                'relativeTimePattern-count-other': 'in {0} min.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} min. ago',
                'relativeTimePattern-count-other': '{0} min. ago'
            }
        },
        'second-wide': {
            'displayName': 'second',
            'relative-type-0': 'now',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} second',
                'relativeTimePattern-count-other': 'in {0} seconds'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} second ago',
                'relativeTimePattern-count-other': '{0} seconds ago'
            }
        },
        'second-short': {
            'displayName': 'sec.',
            'relative-type-0': 'now',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} sec.',
                'relativeTimePattern-count-other': 'in {0} sec.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} sec. ago',
                'relativeTimePattern-count-other': '{0} sec. ago'
            }
        },
        'second-narrow': {
            'displayName': 'sec.',
            'relative-type-0': 'now',
            'relativeTime-type-future': {
                'relativeTimePattern-count-one': 'in {0} sec.',
                'relativeTimePattern-count-other': 'in {0} sec.'
            },
            'relativeTime-type-past': {
                'relativeTimePattern-count-one': '{0} sec. ago',
                'relativeTimePattern-count-other': '{0} sec. ago'
            }
        },
        'zone': { 'displayName': 'time zone' }
    },
    'decimalFormat': { 'standard': '#,##0.###' },
    'currencyFormat': {
        'standard': '\xA4#,##0.00',
        'currencySpacing': {
            'beforeCurrency': {
                'currencyMatch': '[:^S:]',
                'surroundingMatch': '[:digit:]',
                'insertBetween': '\xA0'
            },
            'afterCurrency': {
                'currencyMatch': '[:^S:]',
                'surroundingMatch': '[:digit:]',
                'insertBetween': '\xA0'
            }
        }
    },
    'percentFormat': { 'standard': '#,##0%' },
    'miscPattern': {
        'approximately': '~{0}',
        'atLeast': '{0}+',
        'atMost': '\u2264{0}',
        'range': '{0}\u2013{1}'
    },
    'symbols-latn-decimal': '.',
    'symbols-latn-group': ',',
    'symbols-latn-plusSign': '+',
    'symbols-latn-minusSign': '-',
    'symbols-latn-percentSign': '%',
    'weekData-minDays': 4,
    'weekData-firstDay': 1,
    'weekData-weekendStart': 6,
    'weekData-weekendEnd': 0,
    'timeData': {
        _allowed: 'H h',
        _preferred: 'H'
    },
    'lenient-scope-number': {
        'minusSign': '-\u2010\u2012\u2013\u207B\u208B\u2212\u2796\uFE63',
        'commaSign': ',\u060C\u066B\u3001\uFE10\uFE11\uFE50\uFE51\uFF0C',
        'plusSign': '+\u207A\u208A\u2795\uFB29\uFE62'
    },
    'plurals': {},
    'units': {
        'short': {
            'per': { 'compoundUnitPattern': '{0}/{1}' },
            'acceleration-g-force': {
                'displayName': 'g-force',
                'unitPattern-count-one': '{0} G',
                'unitPattern-count-other': '{0} G'
            },
            'acceleration-meter-per-second-squared': {
                'displayName': 'meters/sec\xB2',
                'unitPattern-count-one': '{0} m/s\xB2',
                'unitPattern-count-other': '{0} m/s\xB2'
            },
            'angle-revolution': {
                'displayName': 'rev',
                'unitPattern-count-one': '{0} rev',
                'unitPattern-count-other': '{0} rev'
            },
            'angle-radian': {
                'displayName': 'radians',
                'unitPattern-count-one': '{0} rad',
                'unitPattern-count-other': '{0} rad'
            },
            'angle-degree': {
                'displayName': 'degrees',
                'unitPattern-count-one': '{0} deg',
                'unitPattern-count-other': '{0} deg'
            },
            'angle-arc-minute': {
                'displayName': 'arcmins',
                'unitPattern-count-one': '{0} arcmin',
                'unitPattern-count-other': '{0} arcmins'
            },
            'angle-arc-second': {
                'displayName': 'arcsecs',
                'unitPattern-count-one': '{0} arcsec',
                'unitPattern-count-other': '{0} arcsecs'
            },
            'area-square-kilometer': {
                'displayName': 'km\xB2',
                'unitPattern-count-one': '{0} km\xB2',
                'unitPattern-count-other': '{0} km\xB2',
                'perUnitPattern': '{0}/km\xB2'
            },
            'area-hectare': {
                'displayName': 'hectares',
                'unitPattern-count-one': '{0} ha',
                'unitPattern-count-other': '{0} ha'
            },
            'area-square-meter': {
                'displayName': 'meters\xB2',
                'unitPattern-count-one': '{0} m\xB2',
                'unitPattern-count-other': '{0} m\xB2',
                'perUnitPattern': '{0}/m\xB2'
            },
            'area-square-centimeter': {
                'displayName': 'cm\xB2',
                'unitPattern-count-one': '{0} cm\xB2',
                'unitPattern-count-other': '{0} cm\xB2',
                'perUnitPattern': '{0}/cm\xB2'
            },
            'area-square-mile': {
                'displayName': 'sq miles',
                'unitPattern-count-one': '{0} sq mi',
                'unitPattern-count-other': '{0} sq mi',
                'perUnitPattern': '{0}/mi\xB2'
            },
            'area-acre': {
                'displayName': 'acres',
                'unitPattern-count-one': '{0} ac',
                'unitPattern-count-other': '{0} ac'
            },
            'area-square-yard': {
                'displayName': 'yards\xB2',
                'unitPattern-count-one': '{0} yd\xB2',
                'unitPattern-count-other': '{0} yd\xB2'
            },
            'area-square-foot': {
                'displayName': 'sq feet',
                'unitPattern-count-one': '{0} sq ft',
                'unitPattern-count-other': '{0} sq ft'
            },
            'area-square-inch': {
                'displayName': 'inches\xB2',
                'unitPattern-count-one': '{0} in\xB2',
                'unitPattern-count-other': '{0} in\xB2',
                'perUnitPattern': '{0}/in\xB2'
            },
            'concentr-karat': {
                'displayName': 'karats',
                'unitPattern-count-one': '{0} kt',
                'unitPattern-count-other': '{0} kt'
            },
            'concentr-milligram-per-deciliter': {
                'displayName': 'mg/dL',
                'unitPattern-count-one': '{0} mg/dL',
                'unitPattern-count-other': '{0} mg/dL'
            },
            'concentr-millimole-per-liter': {
                'displayName': 'millimol/liter',
                'unitPattern-count-one': '{0} mmol/L',
                'unitPattern-count-other': '{0} mmol/L'
            },
            'concentr-part-per-million': {
                'displayName': 'parts/million',
                'unitPattern-count-one': '{0} ppm',
                'unitPattern-count-other': '{0} ppm'
            },
            'consumption-liter-per-kilometer': {
                'displayName': 'liters/km',
                'unitPattern-count-one': '{0} L/km',
                'unitPattern-count-other': '{0} L/km'
            },
            'consumption-liter-per-100kilometers': {
                'displayName': 'L/100 km',
                'unitPattern-count-one': '{0} L/100 km',
                'unitPattern-count-other': '{0} L/100 km'
            },
            'consumption-mile-per-gallon': {
                'displayName': 'miles/gal',
                'unitPattern-count-one': '{0} mpg',
                'unitPattern-count-other': '{0} mpg'
            },
            'consumption-mile-per-gallon-imperial': {
                'displayName': 'miles/gal Imp.',
                'unitPattern-count-one': '{0} mpg Imp.',
                'unitPattern-count-other': '{0} mpg Imp.'
            },
            'digital-terabyte': {
                'displayName': 'TByte',
                'unitPattern-count-one': '{0} TB',
                'unitPattern-count-other': '{0} TB'
            },
            'digital-terabit': {
                'displayName': 'Tbit',
                'unitPattern-count-one': '{0} Tb',
                'unitPattern-count-other': '{0} Tb'
            },
            'digital-gigabyte': {
                'displayName': 'GByte',
                'unitPattern-count-one': '{0} GB',
                'unitPattern-count-other': '{0} GB'
            },
            'digital-gigabit': {
                'displayName': 'Gbit',
                'unitPattern-count-one': '{0} Gb',
                'unitPattern-count-other': '{0} Gb'
            },
            'digital-megabyte': {
                'displayName': 'MByte',
                'unitPattern-count-one': '{0} MB',
                'unitPattern-count-other': '{0} MB'
            },
            'digital-megabit': {
                'displayName': 'Mbit',
                'unitPattern-count-one': '{0} Mb',
                'unitPattern-count-other': '{0} Mb'
            },
            'digital-kilobyte': {
                'displayName': 'kByte',
                'unitPattern-count-one': '{0} kB',
                'unitPattern-count-other': '{0} kB'
            },
            'digital-kilobit': {
                'displayName': 'kbit',
                'unitPattern-count-one': '{0} kb',
                'unitPattern-count-other': '{0} kb'
            },
            'digital-byte': {
                'displayName': 'byte',
                'unitPattern-count-one': '{0} byte',
                'unitPattern-count-other': '{0} byte'
            },
            'digital-bit': {
                'displayName': 'bit',
                'unitPattern-count-one': '{0} bit',
                'unitPattern-count-other': '{0} bit'
            },
            'duration-century': {
                'displayName': 'c',
                'unitPattern-count-one': '{0} c',
                'unitPattern-count-other': '{0} c'
            },
            'duration-year': {
                'displayName': 'years',
                'unitPattern-count-one': '{0} yr',
                'unitPattern-count-other': '{0} yrs',
                'perUnitPattern': '{0}/y'
            },
            'duration-month': {
                'displayName': 'months',
                'unitPattern-count-one': '{0} mth',
                'unitPattern-count-other': '{0} mths',
                'perUnitPattern': '{0}/m'
            },
            'duration-week': {
                'displayName': 'weeks',
                'unitPattern-count-one': '{0} wk',
                'unitPattern-count-other': '{0} wks',
                'perUnitPattern': '{0}/w'
            },
            'duration-day': {
                'displayName': 'days',
                'unitPattern-count-one': '{0} day',
                'unitPattern-count-other': '{0} days',
                'perUnitPattern': '{0}/d'
            },
            'duration-hour': {
                'displayName': 'hours',
                'unitPattern-count-one': '{0} hr',
                'unitPattern-count-other': '{0} hr',
                'perUnitPattern': '{0}/h'
            },
            'duration-minute': {
                'displayName': 'mins',
                'unitPattern-count-one': '{0} min',
                'unitPattern-count-other': '{0} min',
                'perUnitPattern': '{0}/min'
            },
            'duration-second': {
                'displayName': 'secs',
                'unitPattern-count-one': '{0} sec',
                'unitPattern-count-other': '{0} sec',
                'perUnitPattern': '{0}/s'
            },
            'duration-millisecond': {
                'displayName': 'millisecs',
                'unitPattern-count-one': '{0} ms',
                'unitPattern-count-other': '{0} ms'
            },
            'duration-microsecond': {
                'displayName': 'μsecs',
                'unitPattern-count-one': '{0} μs',
                'unitPattern-count-other': '{0} μs'
            },
            'duration-nanosecond': {
                'displayName': 'nanosecs',
                'unitPattern-count-one': '{0} ns',
                'unitPattern-count-other': '{0} ns'
            },
            'electric-ampere': {
                'displayName': 'amps',
                'unitPattern-count-one': '{0} A',
                'unitPattern-count-other': '{0} A'
            },
            'electric-milliampere': {
                'displayName': 'milliamps',
                'unitPattern-count-one': '{0} mA',
                'unitPattern-count-other': '{0} mA'
            },
            'electric-ohm': {
                'displayName': 'ohms',
                'unitPattern-count-one': '{0} Ω',
                'unitPattern-count-other': '{0} Ω'
            },
            'electric-volt': {
                'displayName': 'volts',
                'unitPattern-count-one': '{0} V',
                'unitPattern-count-other': '{0} V'
            },
            'energy-kilocalorie': {
                'displayName': 'kcal',
                'unitPattern-count-one': '{0} kcal',
                'unitPattern-count-other': '{0} kcal'
            },
            'energy-calorie': {
                'displayName': 'cal',
                'unitPattern-count-one': '{0} cal',
                'unitPattern-count-other': '{0} cal'
            },
            'energy-foodcalorie': {
                'displayName': 'Cal',
                'unitPattern-count-one': '{0} Cal',
                'unitPattern-count-other': '{0} Cal'
            },
            'energy-kilojoule': {
                'displayName': 'kilojoule',
                'unitPattern-count-one': '{0} kJ',
                'unitPattern-count-other': '{0} kJ'
            },
            'energy-joule': {
                'displayName': 'joules',
                'unitPattern-count-one': '{0} J',
                'unitPattern-count-other': '{0} J'
            },
            'energy-kilowatt-hour': {
                'displayName': 'kW-hour',
                'unitPattern-count-one': '{0} kWh',
                'unitPattern-count-other': '{0} kWh'
            },
            'frequency-gigahertz': {
                'displayName': 'GHz',
                'unitPattern-count-one': '{0} GHz',
                'unitPattern-count-other': '{0} GHz'
            },
            'frequency-megahertz': {
                'displayName': 'MHz',
                'unitPattern-count-one': '{0} MHz',
                'unitPattern-count-other': '{0} MHz'
            },
            'frequency-kilohertz': {
                'displayName': 'kHz',
                'unitPattern-count-one': '{0} kHz',
                'unitPattern-count-other': '{0} kHz'
            },
            'frequency-hertz': {
                'displayName': 'Hz',
                'unitPattern-count-one': '{0} Hz',
                'unitPattern-count-other': '{0} Hz'
            },
            'length-kilometer': {
                'displayName': 'km',
                'unitPattern-count-one': '{0} km',
                'unitPattern-count-other': '{0} km',
                'perUnitPattern': '{0}/km'
            },
            'length-meter': {
                'displayName': 'm',
                'unitPattern-count-one': '{0} m',
                'unitPattern-count-other': '{0} m',
                'perUnitPattern': '{0}/m'
            },
            'length-decimeter': {
                'displayName': 'dm',
                'unitPattern-count-one': '{0} dm',
                'unitPattern-count-other': '{0} dm'
            },
            'length-centimeter': {
                'displayName': 'cm',
                'unitPattern-count-one': '{0} cm',
                'unitPattern-count-other': '{0} cm',
                'perUnitPattern': '{0}/cm'
            },
            'length-millimeter': {
                'displayName': 'mm',
                'unitPattern-count-one': '{0} mm',
                'unitPattern-count-other': '{0} mm'
            },
            'length-micrometer': {
                'displayName': 'µmeters',
                'unitPattern-count-one': '{0} µm',
                'unitPattern-count-other': '{0} µm'
            },
            'length-nanometer': {
                'displayName': 'nm',
                'unitPattern-count-one': '{0} nm',
                'unitPattern-count-other': '{0} nm'
            },
            'length-picometer': {
                'displayName': 'pm',
                'unitPattern-count-one': '{0} pm',
                'unitPattern-count-other': '{0} pm'
            },
            'length-mile': {
                'displayName': 'miles',
                'unitPattern-count-one': '{0} mi',
                'unitPattern-count-other': '{0} mi'
            },
            'length-yard': {
                'displayName': 'yards',
                'unitPattern-count-one': '{0} yd',
                'unitPattern-count-other': '{0} yd'
            },
            'length-foot': {
                'displayName': 'feet',
                'unitPattern-count-one': '{0} ft',
                'unitPattern-count-other': '{0} ft',
                'perUnitPattern': '{0}/ft'
            },
            'length-inch': {
                'displayName': 'inches',
                'unitPattern-count-one': '{0} in',
                'unitPattern-count-other': '{0} in',
                'perUnitPattern': '{0}/in'
            },
            'length-parsec': {
                'displayName': 'parsecs',
                'unitPattern-count-one': '{0} pc',
                'unitPattern-count-other': '{0} pc'
            },
            'length-light-year': {
                'displayName': 'light yrs',
                'unitPattern-count-one': '{0} ly',
                'unitPattern-count-other': '{0} ly'
            },
            'length-astronomical-unit': {
                'displayName': 'au',
                'unitPattern-count-one': '{0} au',
                'unitPattern-count-other': '{0} au'
            },
            'length-furlong': {
                'displayName': 'furlongs',
                'unitPattern-count-one': '{0} fur',
                'unitPattern-count-other': '{0} fur'
            },
            'length-fathom': {
                'displayName': 'fathoms',
                'unitPattern-count-one': '{0} ftm',
                'unitPattern-count-other': '{0} ftm'
            },
            'length-nautical-mile': {
                'displayName': 'nmi',
                'unitPattern-count-one': '{0} nmi',
                'unitPattern-count-other': '{0} nmi'
            },
            'length-mile-scandinavian': {
                'displayName': 'smi',
                'unitPattern-count-one': '{0} smi',
                'unitPattern-count-other': '{0} smi'
            },
            'length-point': {
                'displayName': 'points',
                'unitPattern-count-one': '{0} pt',
                'unitPattern-count-other': '{0} pt'
            },
            'light-lux': {
                'displayName': 'lux',
                'unitPattern-count-one': '{0} lx',
                'unitPattern-count-other': '{0} lx'
            },
            'mass-metric-ton': {
                'displayName': 't',
                'unitPattern-count-one': '{0} t',
                'unitPattern-count-other': '{0} t'
            },
            'mass-kilogram': {
                'displayName': 'kg',
                'unitPattern-count-one': '{0} kg',
                'unitPattern-count-other': '{0} kg',
                'perUnitPattern': '{0}/kg'
            },
            'mass-gram': {
                'displayName': 'grams',
                'unitPattern-count-one': '{0} g',
                'unitPattern-count-other': '{0} g',
                'perUnitPattern': '{0}/g'
            },
            'mass-milligram': {
                'displayName': 'mg',
                'unitPattern-count-one': '{0} mg',
                'unitPattern-count-other': '{0} mg'
            },
            'mass-microgram': {
                'displayName': 'µg',
                'unitPattern-count-one': '{0} µg',
                'unitPattern-count-other': '{0} µg'
            },
            'mass-ton': {
                'displayName': 'tons',
                'unitPattern-count-one': '{0} tn',
                'unitPattern-count-other': '{0} tn'
            },
            'mass-stone': {
                'displayName': 'stones',
                'unitPattern-count-one': '{0} st',
                'unitPattern-count-other': '{0} st'
            },
            'mass-pound': {
                'displayName': 'pounds',
                'unitPattern-count-one': '{0} lb',
                'unitPattern-count-other': '{0} lb',
                'perUnitPattern': '{0}/lb'
            },
            'mass-ounce': {
                'displayName': 'oz',
                'unitPattern-count-one': '{0} oz',
                'unitPattern-count-other': '{0} oz',
                'perUnitPattern': '{0}/oz'
            },
            'mass-ounce-troy': {
                'displayName': 'oz troy',
                'unitPattern-count-one': '{0} oz t',
                'unitPattern-count-other': '{0} oz t'
            },
            'mass-carat': {
                'displayName': 'carats',
                'unitPattern-count-one': '{0} CD',
                'unitPattern-count-other': '{0} CD'
            },
            'power-gigawatt': {
                'displayName': 'GW',
                'unitPattern-count-one': '{0} GW',
                'unitPattern-count-other': '{0} GW'
            },
            'power-megawatt': {
                'displayName': 'MW',
                'unitPattern-count-one': '{0} MW',
                'unitPattern-count-other': '{0} MW'
            },
            'power-kilowatt': {
                'displayName': 'kW',
                'unitPattern-count-one': '{0} kW',
                'unitPattern-count-other': '{0} kW'
            },
            'power-watt': {
                'displayName': 'watts',
                'unitPattern-count-one': '{0} W',
                'unitPattern-count-other': '{0} W'
            },
            'power-milliwatt': {
                'displayName': 'mW',
                'unitPattern-count-one': '{0} mW',
                'unitPattern-count-other': '{0} mW'
            },
            'power-horsepower': {
                'displayName': 'hp',
                'unitPattern-count-one': '{0} hp',
                'unitPattern-count-other': '{0} hp'
            },
            'pressure-hectopascal': {
                'displayName': 'hPa',
                'unitPattern-count-one': '{0} hPa',
                'unitPattern-count-other': '{0} hPa'
            },
            'pressure-millimeter-of-mercury': {
                'displayName': 'mmHg',
                'unitPattern-count-one': '{0} mmHg',
                'unitPattern-count-other': '{0} mmHg'
            },
            'pressure-pound-per-square-inch': {
                'displayName': 'psi',
                'unitPattern-count-one': '{0} psi',
                'unitPattern-count-other': '{0} psi'
            },
            'pressure-inch-hg': {
                'displayName': 'inHg',
                'unitPattern-count-one': '{0} inHg',
                'unitPattern-count-other': '{0} inHg'
            },
            'pressure-millibar': {
                'displayName': 'mbar',
                'unitPattern-count-one': '{0} mbar',
                'unitPattern-count-other': '{0} mbar'
            },
            'speed-kilometer-per-hour': {
                'displayName': 'km/hour',
                'unitPattern-count-one': '{0} kph',
                'unitPattern-count-other': '{0} kph'
            },
            'speed-meter-per-second': {
                'displayName': 'meters/sec',
                'unitPattern-count-one': '{0} m/s',
                'unitPattern-count-other': '{0} m/s'
            },
            'speed-mile-per-hour': {
                'displayName': 'miles/hour',
                'unitPattern-count-one': '{0} mph',
                'unitPattern-count-other': '{0} mph'
            },
            'speed-knot': {
                'displayName': 'kn',
                'unitPattern-count-one': '{0} kn',
                'unitPattern-count-other': '{0} kn'
            },
            'temperature-generic': {
                'displayName': '\xB0',
                'unitPattern-count-other': '{0}\xB0'
            },
            'temperature-celsius': {
                'displayName': 'deg. C',
                'unitPattern-count-one': '{0}\xB0C',
                'unitPattern-count-other': '{0}\xB0C'
            },
            'temperature-fahrenheit': {
                'displayName': 'deg. F',
                'unitPattern-count-one': '{0}\xB0F',
                'unitPattern-count-other': '{0}\xB0F'
            },
            'temperature-kelvin': {
                'displayName': 'K',
                'unitPattern-count-one': '{0} K',
                'unitPattern-count-other': '{0} K'
            },
            'volume-cubic-kilometer': {
                'displayName': 'km\xB3',
                'unitPattern-count-one': '{0} km\xB3',
                'unitPattern-count-other': '{0} km\xB3'
            },
            'volume-cubic-meter': {
                'displayName': 'm\xB3',
                'unitPattern-count-one': '{0} m\xB3',
                'unitPattern-count-other': '{0} m\xB3',
                'perUnitPattern': '{0}/m\xB3'
            },
            'volume-cubic-centimeter': {
                'displayName': 'cm\xB3',
                'unitPattern-count-one': '{0} cm\xB3',
                'unitPattern-count-other': '{0} cm\xB3',
                'perUnitPattern': '{0}/cm\xB3'
            },
            'volume-cubic-mile': {
                'displayName': 'mi\xB3',
                'unitPattern-count-one': '{0} mi\xB3',
                'unitPattern-count-other': '{0} mi\xB3'
            },
            'volume-cubic-yard': {
                'displayName': 'yards\xB3',
                'unitPattern-count-one': '{0} yd\xB3',
                'unitPattern-count-other': '{0} yd\xB3'
            },
            'volume-cubic-foot': {
                'displayName': 'feet\xB3',
                'unitPattern-count-one': '{0} ft\xB3',
                'unitPattern-count-other': '{0} ft\xB3'
            },
            'volume-cubic-inch': {
                'displayName': 'inches\xB3',
                'unitPattern-count-one': '{0} in\xB3',
                'unitPattern-count-other': '{0} in\xB3'
            },
            'volume-megaliter': {
                'displayName': 'ML',
                'unitPattern-count-one': '{0} ML',
                'unitPattern-count-other': '{0} ML'
            },
            'volume-hectoliter': {
                'displayName': 'hL',
                'unitPattern-count-one': '{0} hL',
                'unitPattern-count-other': '{0} hL'
            },
            'volume-liter': {
                'displayName': 'liters',
                'unitPattern-count-one': '{0} L',
                'unitPattern-count-other': '{0} L',
                'perUnitPattern': '{0}/L'
            },
            'volume-deciliter': {
                'displayName': 'dL',
                'unitPattern-count-one': '{0} dL',
                'unitPattern-count-other': '{0} dL'
            },
            'volume-centiliter': {
                'displayName': 'cL',
                'unitPattern-count-one': '{0} cL',
                'unitPattern-count-other': '{0} cL'
            },
            'volume-milliliter': {
                'displayName': 'mL',
                'unitPattern-count-one': '{0} mL',
                'unitPattern-count-other': '{0} mL'
            },
            'volume-pint-metric': {
                'displayName': 'mpt',
                'unitPattern-count-one': '{0} mpt',
                'unitPattern-count-other': '{0} mpt'
            },
            'volume-cup-metric': {
                'displayName': 'mcup',
                'unitPattern-count-one': '{0} mc',
                'unitPattern-count-other': '{0} mc'
            },
            'volume-acre-foot': {
                'displayName': 'acre ft',
                'unitPattern-count-one': '{0} ac ft',
                'unitPattern-count-other': '{0} ac ft'
            },
            'volume-bushel': {
                'displayName': 'bushels',
                'unitPattern-count-one': '{0} bu',
                'unitPattern-count-other': '{0} bu'
            },
            'volume-gallon': {
                'displayName': 'gal',
                'unitPattern-count-one': '{0} gal',
                'unitPattern-count-other': '{0} gal',
                'perUnitPattern': '{0}/gal US'
            },
            'volume-gallon-imperial': {
                'displayName': 'Imp. gal',
                'unitPattern-count-one': '{0} gal Imp.',
                'unitPattern-count-other': '{0} gal Imp.',
                'perUnitPattern': '{0}/gal Imp.'
            },
            'volume-quart': {
                'displayName': 'qts',
                'unitPattern-count-one': '{0} qt',
                'unitPattern-count-other': '{0} qt'
            },
            'volume-pint': {
                'displayName': 'pints',
                'unitPattern-count-one': '{0} pt',
                'unitPattern-count-other': '{0} pt'
            },
            'volume-cup': {
                'displayName': 'cups',
                'unitPattern-count-one': '{0} c',
                'unitPattern-count-other': '{0} c'
            },
            'volume-fluid-ounce': {
                'displayName': 'fl oz',
                'unitPattern-count-one': '{0} fl oz',
                'unitPattern-count-other': '{0} fl oz'
            },
            'volume-tablespoon': {
                'displayName': 'tbsp',
                'unitPattern-count-one': '{0} tbsp',
                'unitPattern-count-other': '{0} tbsp'
            },
            'volume-teaspoon': {
                'displayName': 'tsp',
                'unitPattern-count-one': '{0} tsp',
                'unitPattern-count-other': '{0} tsp'
            },
            'coordinateUnit': {
                'east': '{0} E',
                'north': '{0} N',
                'south': '{0} S',
                'west': '{0} W'
            }
        }
    }
};
var M_ISO639_OLD_TO_NEW$3 = {
    'iw': 'he',
    'ji': 'yi',
    'in': 'id',
    'sh': 'sr'
};
var M_SUPPORTED_LOCALES = function () {
    var LOCALES = Locale$1._cldrLocales, result = {}, i;
    if (LOCALES) {
        for (i = 0; i < LOCALES.length; i++) {
            result[LOCALES[i]] = true;
        }
    }
    return result;
}();
var mLocaleDatas = {};
function getCLDRCalendarName(sCalendarType) {
    if (!sCalendarType) {
        sCalendarType = Core.getConfiguration().getCalendarType();
    }
    return 'ca-' + sCalendarType.toLowerCase();
}
function getData(oLocale) {
    var sLanguage = oLocale.getLanguage() || '', sScript = oLocale.getScript() || '', sRegion = oLocale.getRegion() || '', mData;
    function merge(obj, fallbackObj) {
        var name, value, fallbackValue;
        if (!fallbackObj) {
            return;
        }
        for (name in fallbackObj) {
            if (fallbackObj.hasOwnProperty(name)) {
                value = obj[name];
                fallbackValue = fallbackObj[name];
                if (value === undefined) {
                    obj[name] = fallbackValue;
                } else if (value === null) {
                    delete obj[name];
                } else if (typeof value === 'object' && typeof fallbackValue === 'object') {
                    merge(value, fallbackValue);
                }
            }
        }
    }
    function getOrLoad(sId) {
        if (!mLocaleDatas[sId] && (!M_SUPPORTED_LOCALES || M_SUPPORTED_LOCALES[sId] === true)) {
            var data = mLocaleDatas[sId] = LoaderExtensions.loadResource('sap/ui/core/cldr/' + sId + '.json', {
                dataType: 'json',
                failOnError: false
            });
            if (data && data.__fallbackLocale) {
                merge(data, getOrLoad(data.__fallbackLocale));
                delete data.__fallbackLocale;
            }
        }
        return mLocaleDatas[sId];
    }
    sLanguage = sLanguage && M_ISO639_OLD_TO_NEW$3[sLanguage] || sLanguage;
    if (sLanguage === 'no') {
        sLanguage = 'nb';
    }
    if (sLanguage === 'zh' && !sRegion) {
        if (sScript === 'Hans') {
            sRegion = 'CN';
        } else if (sScript === 'Hant') {
            sRegion = 'TW';
        }
    }
    var sId = sLanguage + '_' + sRegion;
    if (sLanguage && sRegion) {
        mData = getOrLoad(sId);
    }
    if (!mData && sLanguage) {
        mData = getOrLoad(sLanguage);
    }
    mLocaleDatas[sId] = mData || M_DEFAULT_DATA;
    return mLocaleDatas[sId];
}
var CustomLocaleData = LocaleData.extend('sap.ui.core.CustomLocaleData', {
    constructor: function (oLocale) {
        LocaleData.apply(this, arguments);
        this.mCustomData = Core.getConfiguration().getFormatSettings().getCustomLocaleData();
    },
    _get: function () {
        var aArguments = Array.prototype.slice.call(arguments), sCalendar, sKey;
        if (aArguments[0].indexOf('ca-') == 0) {
            sCalendar = aArguments[0];
            if (sCalendar == getCLDRCalendarName()) {
                aArguments = aArguments.slice(1);
            }
        }
        sKey = aArguments.join('-');
        var vValue = this.mCustomData[sKey];
        if (vValue == null) {
            vValue = this._getDeep(this.mCustomData, arguments);
            if (vValue == null) {
                vValue = this._getDeep(this.mData, arguments);
            }
        }
        return vValue;
    },
    _getMerged: function () {
        var mData = this._getDeep(this.mData, arguments);
        var mCustomData = this._getDeep(this.mCustomData, arguments);
        return fnExtend({}, mData, mCustomData);
    }
});
LocaleData.getInstance = function (oLocale) {
    return oLocale.hasPrivateUseSubtag('sapufmt') ? new CustomLocaleData(oLocale) : new LocaleData(oLocale);
};

var mRegistry = new Map();
var _Calendars = {
  get: function (sCalendarType) {
    if (!mRegistry.has(sCalendarType)) {
      throw new Error("Required calendar type: " + sCalendarType + " not loaded.");
    }
    return mRegistry.get(sCalendarType);
  },
  set: function (sCalendarType, CalendarClass) {
    mRegistry.set(sCalendarType, CalendarClass);
  }
};

var UniversalDate = BaseObject$1.extend('sap.ui.core.date.UniversalDate', {
    constructor: function () {
        var clDate = UniversalDate.getClass();
        return this.createDate(clDate, arguments);
    }
});
UniversalDate.UTC = function () {
    var clDate = UniversalDate.getClass();
    return clDate.UTC.apply(clDate, arguments);
};
UniversalDate.now = function () {
    return Date.now();
};
UniversalDate.prototype.createDate = function (clDate, aArgs) {
    switch (aArgs.length) {
    case 0:
        return new clDate();
    case 1:
        return new clDate(aArgs[0]);
    case 2:
        return new clDate(aArgs[0], aArgs[1]);
    case 3:
        return new clDate(aArgs[0], aArgs[1], aArgs[2]);
    case 4:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3]);
    case 5:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4]);
    case 6:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4], aArgs[5]);
    case 7:
        return new clDate(aArgs[0], aArgs[1], aArgs[2], aArgs[3], aArgs[4], aArgs[5], aArgs[6]);
    }
};
UniversalDate.getInstance = function (oDate, sCalendarType) {
    var clDate, oInstance;
    if (oDate instanceof UniversalDate) {
        oDate = oDate.getJSDate();
    }
    if (!sCalendarType) {
        sCalendarType = Core.getConfiguration().getCalendarType();
    }
    clDate = UniversalDate.getClass(sCalendarType);
    oInstance = Object.create(clDate.prototype);
    oInstance.oDate = oDate;
    oInstance.sCalendarType = sCalendarType;
    return oInstance;
};
UniversalDate.getClass = function (sCalendarType) {
    if (!sCalendarType) {
        sCalendarType = Core.getConfiguration().getCalendarType();
    }
    return _Calendars.get(sCalendarType);
};
[
    'getDate',
    'getMonth',
    'getFullYear',
    'getYear',
    'getDay',
    'getHours',
    'getMinutes',
    'getSeconds',
    'getMilliseconds',
    'getUTCDate',
    'getUTCMonth',
    'getUTCFullYear',
    'getUTCDay',
    'getUTCHours',
    'getUTCMinutes',
    'getUTCSeconds',
    'getUTCMilliseconds',
    'getTime',
    'valueOf',
    'getTimezoneOffset',
    'toString',
    'toDateString',
    'setDate',
    'setFullYear',
    'setYear',
    'setMonth',
    'setHours',
    'setMinutes',
    'setSeconds',
    'setMilliseconds',
    'setUTCDate',
    'setUTCFullYear',
    'setUTCMonth',
    'setUTCHours',
    'setUTCMinutes',
    'setUTCSeconds',
    'setUTCMilliseconds'
].forEach(function (sName) {
    UniversalDate.prototype[sName] = function () {
        return this.oDate[sName].apply(this.oDate, arguments);
    };
});
UniversalDate.prototype.getJSDate = function () {
    return this.oDate;
};
UniversalDate.prototype.getCalendarType = function () {
    return this.sCalendarType;
};
UniversalDate.prototype.getEra = function () {
    return UniversalDate.getEraByDate(this.sCalendarType, this.oDate.getFullYear(), this.oDate.getMonth(), this.oDate.getDate());
};
UniversalDate.prototype.setEra = function (iEra) {
};
UniversalDate.prototype.getUTCEra = function () {
    return UniversalDate.getEraByDate(this.sCalendarType, this.oDate.getUTCFullYear(), this.oDate.getUTCMonth(), this.oDate.getUTCDate());
};
UniversalDate.prototype.setUTCEra = function (iEra) {
};
UniversalDate.prototype.getWeek = function () {
    return UniversalDate.getWeekByDate(this.sCalendarType, this.getFullYear(), this.getMonth(), this.getDate());
};
UniversalDate.prototype.setWeek = function (oWeek) {
    var oDate = UniversalDate.getFirstDateOfWeek(this.sCalendarType, oWeek.year || this.getFullYear(), oWeek.week);
    this.setFullYear(oDate.year, oDate.month, oDate.day);
};
UniversalDate.prototype.getUTCWeek = function () {
    return UniversalDate.getWeekByDate(this.sCalendarType, this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate());
};
UniversalDate.prototype.setUTCWeek = function (oWeek) {
    var oDate = UniversalDate.getFirstDateOfWeek(this.sCalendarType, oWeek.year || this.getFullYear(), oWeek.week);
    this.setUTCFullYear(oDate.year, oDate.month, oDate.day);
};
UniversalDate.prototype.getQuarter = function () {
    return Math.floor(this.getMonth() / 3);
};
UniversalDate.prototype.getUTCQuarter = function () {
    return Math.floor(this.getUTCMonth() / 3);
};
UniversalDate.prototype.getDayPeriod = function () {
    if (this.getHours() < 12) {
        return 0;
    } else {
        return 1;
    }
};
UniversalDate.prototype.getUTCDayPeriod = function () {
    if (this.getUTCHours() < 12) {
        return 0;
    } else {
        return 1;
    }
};
UniversalDate.prototype.getTimezoneShort = function () {
    if (this.oDate.getTimezoneShort) {
        return this.oDate.getTimezoneShort();
    }
};
UniversalDate.prototype.getTimezoneLong = function () {
    if (this.oDate.getTimezoneLong) {
        return this.oDate.getTimezoneLong();
    }
};
var iMillisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
UniversalDate.getWeekByDate = function (sCalendarType, iYear, iMonth, iDay) {
    var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(), clDate = this.getClass(sCalendarType), oFirstDay = getFirstDayOfFirstWeek(clDate, iYear), oDate = new clDate(clDate.UTC(iYear, iMonth, iDay)), iWeek, iLastYear, iNextYear, oLastFirstDay, oNextFirstDay;
    if (oLocale.getRegion() === 'US') {
        iWeek = calculateWeeks(oFirstDay, oDate);
    } else {
        iLastYear = iYear - 1;
        iNextYear = iYear + 1;
        oLastFirstDay = getFirstDayOfFirstWeek(clDate, iLastYear);
        oNextFirstDay = getFirstDayOfFirstWeek(clDate, iNextYear);
        if (oDate >= oNextFirstDay) {
            iYear = iNextYear;
            iWeek = 0;
        } else if (oDate < oFirstDay) {
            iYear = iLastYear;
            iWeek = calculateWeeks(oLastFirstDay, oDate);
        } else {
            iWeek = calculateWeeks(oFirstDay, oDate);
        }
    }
    return {
        year: iYear,
        week: iWeek
    };
};
UniversalDate.getFirstDateOfWeek = function (sCalendarType, iYear, iWeek) {
    var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(), clDate = this.getClass(sCalendarType), oFirstDay = getFirstDayOfFirstWeek(clDate, iYear), oDate = new clDate(oFirstDay.valueOf() + iWeek * iMillisecondsInWeek);
    if (oLocale.getRegion() === 'US' && iWeek === 0 && oFirstDay.getUTCFullYear() < iYear) {
        return {
            year: iYear,
            month: 0,
            day: 1
        };
    }
    return {
        year: oDate.getUTCFullYear(),
        month: oDate.getUTCMonth(),
        day: oDate.getUTCDate()
    };
};
function getFirstDayOfFirstWeek(clDate, iYear) {
    var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(), oLocaleData = LocaleData.getInstance(oLocale), iMinDays = oLocaleData.getMinimalDaysInFirstWeek(), iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek(), oFirstDay = new clDate(clDate.UTC(iYear, 0, 1)), iDayCount = 7;
    while (oFirstDay.getUTCDay() !== iFirstDayOfWeek) {
        oFirstDay.setUTCDate(oFirstDay.getUTCDate() - 1);
        iDayCount--;
    }
    if (iDayCount < iMinDays) {
        oFirstDay.setUTCDate(oFirstDay.getUTCDate() + 7);
    }
    return oFirstDay;
}
function calculateWeeks(oFromDate, oToDate) {
    return Math.floor((oToDate.valueOf() - oFromDate.valueOf()) / iMillisecondsInWeek);
}
var mEras = {};
UniversalDate.getEraByDate = function (sCalendarType, iYear, iMonth, iDay) {
    var aEras = getEras(sCalendarType), iTimestamp = new Date(0).setUTCFullYear(iYear, iMonth, iDay), oEra;
    for (var i = aEras.length - 1; i >= 0; i--) {
        oEra = aEras[i];
        if (!oEra) {
            continue;
        }
        if (oEra._start && iTimestamp >= oEra._startInfo.timestamp) {
            return i;
        }
        if (oEra._end && iTimestamp < oEra._endInfo.timestamp) {
            return i;
        }
    }
};
UniversalDate.getCurrentEra = function (sCalendarType) {
    var oNow = new Date();
    return this.getEraByDate(sCalendarType, oNow.getFullYear(), oNow.getMonth(), oNow.getDate());
};
UniversalDate.getEraStartDate = function (sCalendarType, iEra) {
    var aEras = getEras(sCalendarType), oEra = aEras[iEra] || aEras[0];
    if (oEra._start) {
        return oEra._startInfo;
    }
};
function getEras(sCalendarType) {
    var oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale(), oLocaleData = LocaleData.getInstance(oLocale), aEras = mEras[sCalendarType];
    if (!aEras) {
        var aEras = oLocaleData.getEraDates(sCalendarType);
        if (!aEras[0]) {
            aEras[0] = { _start: '1-1-1' };
        }
        for (var i = 0; i < aEras.length; i++) {
            var oEra = aEras[i];
            if (!oEra) {
                continue;
            }
            if (oEra._start) {
                oEra._startInfo = parseDateString(oEra._start);
            }
            if (oEra._end) {
                oEra._endInfo = parseDateString(oEra._end);
            }
        }
        mEras[sCalendarType] = aEras;
    }
    return aEras;
}
function parseDateString(sDateString) {
    var aParts = sDateString.split('-'), iYear, iMonth, iDay;
    if (aParts[0] == '') {
        iYear = -parseInt(aParts[1]);
        iMonth = parseInt(aParts[2]) - 1;
        iDay = parseInt(aParts[3]);
    } else {
        iYear = parseInt(aParts[0]);
        iMonth = parseInt(aParts[1]) - 1;
        iDay = parseInt(aParts[2]);
    }
    return {
        timestamp: new Date(0).setUTCFullYear(iYear, iMonth, iDay),
        year: iYear,
        month: iMonth,
        day: iDay
    };
}

var fnEqual = function (a, b, maxDepth, contains, depth) {
    if (typeof maxDepth == 'boolean') {
        contains = maxDepth;
        maxDepth = undefined;
    }
    if (!depth) {
        depth = 0;
    }
    if (!maxDepth) {
        maxDepth = 10;
    }
    if (depth > maxDepth) {
        Log.warning('deepEqual comparison exceeded maximum recursion depth of ' + maxDepth + '. Treating values as unequal');
        return false;
    }
    if (a === b) {
        return true;
    }
    var bIsReallyNaN = typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
    if (bIsReallyNaN) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (!contains && a.length !== b.length) {
            return false;
        }
        if (a.length > b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (!fnEqual(a[i], b[i], maxDepth, contains, depth + 1)) {
                return false;
            }
        }
        return true;
    }
    if (typeof a == 'object' && typeof b == 'object') {
        if (!a || !b) {
            return false;
        }
        if (a.constructor !== b.constructor) {
            return false;
        }
        if (!contains && Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        if (a instanceof Node) {
            return a.isEqualNode(b);
        }
        if (a instanceof Date) {
            return a.valueOf() === b.valueOf();
        }
        for (var i in a) {
            if (!fnEqual(a[i], b[i], maxDepth, contains, depth + 1)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

var rMessageFormat = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
var fnFormatMessage = function (sPattern, aValues) {
    fnAssert(typeof sPattern === 'string' || sPattern instanceof String, 'pattern must be string');
    if (arguments.length > 2 || aValues != null && !Array.isArray(aValues)) {
        aValues = Array.prototype.slice.call(arguments, 1);
    }
    aValues = aValues || [];
    return sPattern.replace(rMessageFormat, function ($0, $1, $2, $3, offset) {
        if ($1) {
            return '\'';
        } else if ($2) {
            return $2.replace(/''/g, '\'');
        } else if ($3) {
            return String(aValues[parseInt($3)]);
        }
        throw new Error('formatMessage: pattern syntax error at pos. ' + offset);
    });
};

var DateFormat = function () {
    throw new Error();
};
var mCldrDatePattern = {};
DateFormat.oDateInfo = {
    oDefaultFormatOptions: {
        style: 'medium',
        relativeScale: 'day',
        relativeStyle: 'wide'
    },
    aFallbackFormatOptions: [
        { style: 'short' },
        { style: 'medium' },
        { pattern: 'yyyy-MM-dd' },
        {
            pattern: 'yyyyMMdd',
            strictParsing: true
        }
    ],
    bShortFallbackFormatOptions: true,
    bPatternFallbackWithoutDelimiter: true,
    getPattern: function (oLocaleData, sStyle, sCalendarType) {
        return oLocaleData.getDatePattern(sStyle, sCalendarType);
    },
    oRequiredParts: {
        'text': true,
        'year': true,
        'weekYear': true,
        'month': true,
        'day': true
    },
    aRelativeScales: [
        'year',
        'month',
        'week',
        'day'
    ],
    aRelativeParseScales: [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aIntervalCompareFields: [
        'Era',
        'FullYear',
        'Quarter',
        'Month',
        'Week',
        'Date'
    ]
};
DateFormat.oDateTimeInfo = {
    oDefaultFormatOptions: {
        style: 'medium',
        relativeScale: 'auto',
        relativeStyle: 'wide'
    },
    aFallbackFormatOptions: [
        { style: 'short' },
        { style: 'medium' },
        { pattern: 'yyyy-MM-dd\'T\'HH:mm:ss' },
        { pattern: 'yyyyMMdd HHmmss' }
    ],
    getPattern: function (oLocaleData, sStyle, sCalendarType) {
        var iSlashIndex = sStyle.indexOf('/');
        if (iSlashIndex > 0) {
            return oLocaleData.getCombinedDateTimePattern(sStyle.substr(0, iSlashIndex), sStyle.substr(iSlashIndex + 1), sCalendarType);
        } else {
            return oLocaleData.getCombinedDateTimePattern(sStyle, sStyle, sCalendarType);
        }
    },
    oRequiredParts: {
        'text': true,
        'year': true,
        'weekYear': true,
        'month': true,
        'day': true,
        'hour0_23': true,
        'hour1_24': true,
        'hour0_11': true,
        'hour1_12': true
    },
    aRelativeScales: [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aRelativeParseScales: [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aIntervalCompareFields: [
        'Era',
        'FullYear',
        'Quarter',
        'Month',
        'Week',
        'Date',
        'DayPeriod',
        'Hours',
        'Minutes',
        'Seconds'
    ]
};
DateFormat.oTimeInfo = {
    oDefaultFormatOptions: {
        style: 'medium',
        relativeScale: 'auto',
        relativeStyle: 'wide'
    },
    aFallbackFormatOptions: [
        { style: 'short' },
        { style: 'medium' },
        { pattern: 'HH:mm:ss' },
        { pattern: 'HHmmss' }
    ],
    getPattern: function (oLocaleData, sStyle, sCalendarType) {
        return oLocaleData.getTimePattern(sStyle, sCalendarType);
    },
    oRequiredParts: {
        'text': true,
        'hour0_23': true,
        'hour1_24': true,
        'hour0_11': true,
        'hour1_12': true
    },
    aRelativeScales: [
        'hour',
        'minute',
        'second'
    ],
    aRelativeParseScales: [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second'
    ],
    aIntervalCompareFields: [
        'DayPeriod',
        'Hours',
        'Minutes',
        'Seconds'
    ]
};
DateFormat.getInstance = function (oFormatOptions, oLocale) {
    return this.getDateInstance(oFormatOptions, oLocale);
};
DateFormat.getDateInstance = function (oFormatOptions, oLocale) {
    return this.createInstance(oFormatOptions, oLocale, this.oDateInfo);
};
DateFormat.getDateTimeInstance = function (oFormatOptions, oLocale) {
    return this.createInstance(oFormatOptions, oLocale, this.oDateTimeInfo);
};
DateFormat.getTimeInstance = function (oFormatOptions, oLocale) {
    return this.createInstance(oFormatOptions, oLocale, this.oTimeInfo);
};
function createIntervalPatternWithNormalConnector(oFormat) {
    var sPattern = oFormat.oLocaleData.getIntervalPattern('', oFormat.oFormatOptions.calendarType);
    sPattern = sPattern.replace(/[^\{\}01 ]/, '-');
    return sPattern.replace(/\{(0|1)\}/g, oFormat.oFormatOptions.pattern);
}
DateFormat.createInstance = function (oFormatOptions, oLocale, oInfo) {
    var oFormat = Object.create(this.prototype);
    if (oFormatOptions instanceof Locale$1) {
        oLocale = oFormatOptions;
        oFormatOptions = undefined;
    }
    if (!oLocale) {
        oLocale = Core.getConfiguration().getFormatSettings().getFormatLocale();
    }
    oFormat.oLocale = oLocale;
    oFormat.oLocaleData = LocaleData.getInstance(oLocale);
    oFormat.oFormatOptions = fnExtend({}, oInfo.oDefaultFormatOptions, oFormatOptions);
    if (!oFormat.oFormatOptions.calendarType) {
        oFormat.oFormatOptions.calendarType = Core.getConfiguration().getCalendarType();
    }
    if (!oFormat.oFormatOptions.pattern) {
        if (oFormat.oFormatOptions.format) {
            oFormat.oFormatOptions.pattern = oFormat.oLocaleData.getCustomDateTimePattern(oFormat.oFormatOptions.format, oFormat.oFormatOptions.calendarType);
        } else {
            oFormat.oFormatOptions.pattern = oInfo.getPattern(oFormat.oLocaleData, oFormat.oFormatOptions.style, oFormat.oFormatOptions.calendarType);
        }
    }
    if (oFormat.oFormatOptions.interval) {
        if (oFormat.oFormatOptions.format) {
            oFormat.intervalPatterns = oFormat.oLocaleData.getCustomIntervalPattern(oFormat.oFormatOptions.format, null, oFormat.oFormatOptions.calendarType);
            if (typeof oFormat.intervalPatterns === 'string') {
                oFormat.intervalPatterns = [oFormat.intervalPatterns];
            }
            oFormat.intervalPatterns.push(oFormat.oLocaleData.getCustomDateTimePattern(oFormat.oFormatOptions.format, oFormat.oFormatOptions.calendarType));
        } else {
            oFormat.intervalPatterns = [
                oFormat.oLocaleData.getCombinedIntervalPattern(oFormat.oFormatOptions.pattern, oFormat.oFormatOptions.calendarType),
                oFormat.oFormatOptions.pattern
            ];
        }
        var sCommonConnectorPattern = createIntervalPatternWithNormalConnector(oFormat);
        oFormat.intervalPatterns.push(sCommonConnectorPattern);
    }
    if (!oFormat.oFormatOptions.fallback) {
        if (!oInfo.oFallbackFormats) {
            oInfo.oFallbackFormats = {};
        }
        var sLocale = oLocale.toString(), sCalendarType = oFormat.oFormatOptions.calendarType, sKey = sLocale + '-' + sCalendarType, sPattern, aFallbackFormatOptions;
        if (oFormat.oFormatOptions.pattern && oInfo.bPatternFallbackWithoutDelimiter) {
            sKey = sKey + '-' + oFormat.oFormatOptions.pattern;
        }
        if (oFormat.oFormatOptions.interval) {
            sKey = sKey + '-' + 'interval';
        }
        var oFallbackFormats = oInfo.oFallbackFormats[sKey] ? Object.assign({}, oInfo.oFallbackFormats[sKey]) : undefined;
        if (!oFallbackFormats) {
            aFallbackFormatOptions = oInfo.aFallbackFormatOptions;
            if (oInfo.bShortFallbackFormatOptions) {
                sPattern = oInfo.getPattern(oFormat.oLocaleData, 'short');
                aFallbackFormatOptions = aFallbackFormatOptions.concat(DateFormat._createFallbackOptionsWithoutDelimiter(sPattern));
            }
            if (oFormat.oFormatOptions.pattern && oInfo.bPatternFallbackWithoutDelimiter) {
                aFallbackFormatOptions = DateFormat._createFallbackOptionsWithoutDelimiter(oFormat.oFormatOptions.pattern).concat(aFallbackFormatOptions);
            }
            oFallbackFormats = DateFormat._createFallbackFormat(aFallbackFormatOptions, sCalendarType, oLocale, oInfo, oFormat.oFormatOptions.interval);
        }
        oFormat.aFallbackFormats = oFallbackFormats;
    }
    oFormat.oRequiredParts = oInfo.oRequiredParts;
    oFormat.aRelativeScales = oInfo.aRelativeScales;
    oFormat.aRelativeParseScales = oInfo.aRelativeParseScales;
    oFormat.aIntervalCompareFields = oInfo.aIntervalCompareFields;
    oFormat.init();
    return oFormat;
};
DateFormat.prototype.init = function () {
    var sCalendarType = this.oFormatOptions.calendarType;
    this.aMonthsAbbrev = this.oLocaleData.getMonths('abbreviated', sCalendarType);
    this.aMonthsWide = this.oLocaleData.getMonths('wide', sCalendarType);
    this.aMonthsNarrow = this.oLocaleData.getMonths('narrow', sCalendarType);
    this.aMonthsAbbrevSt = this.oLocaleData.getMonthsStandAlone('abbreviated', sCalendarType);
    this.aMonthsWideSt = this.oLocaleData.getMonthsStandAlone('wide', sCalendarType);
    this.aMonthsNarrowSt = this.oLocaleData.getMonthsStandAlone('narrow', sCalendarType);
    this.aDaysAbbrev = this.oLocaleData.getDays('abbreviated', sCalendarType);
    this.aDaysWide = this.oLocaleData.getDays('wide', sCalendarType);
    this.aDaysNarrow = this.oLocaleData.getDays('narrow', sCalendarType);
    this.aDaysShort = this.oLocaleData.getDays('short', sCalendarType);
    this.aDaysAbbrevSt = this.oLocaleData.getDaysStandAlone('abbreviated', sCalendarType);
    this.aDaysWideSt = this.oLocaleData.getDaysStandAlone('wide', sCalendarType);
    this.aDaysNarrowSt = this.oLocaleData.getDaysStandAlone('narrow', sCalendarType);
    this.aDaysShortSt = this.oLocaleData.getDaysStandAlone('short', sCalendarType);
    this.aQuartersAbbrev = this.oLocaleData.getQuarters('abbreviated', sCalendarType);
    this.aQuartersWide = this.oLocaleData.getQuarters('wide', sCalendarType);
    this.aQuartersNarrow = this.oLocaleData.getQuarters('narrow', sCalendarType);
    this.aQuartersAbbrevSt = this.oLocaleData.getQuartersStandAlone('abbreviated', sCalendarType);
    this.aQuartersWideSt = this.oLocaleData.getQuartersStandAlone('wide', sCalendarType);
    this.aQuartersNarrowSt = this.oLocaleData.getQuartersStandAlone('narrow', sCalendarType);
    this.aErasNarrow = this.oLocaleData.getEras('narrow', sCalendarType);
    this.aErasAbbrev = this.oLocaleData.getEras('abbreviated', sCalendarType);
    this.aErasWide = this.oLocaleData.getEras('wide', sCalendarType);
    this.aDayPeriods = this.oLocaleData.getDayPeriods('abbreviated', sCalendarType);
    this.aFormatArray = this.parseCldrDatePattern(this.oFormatOptions.pattern);
    this.sAllowedCharacters = this.getAllowedCharacters(this.aFormatArray);
};
DateFormat._createFallbackFormat = function (aFallbackFormatOptions, sCalendarType, oLocale, oInfo, bInterval) {
    return aFallbackFormatOptions.map(function (oOptions) {
        var oFormatOptions = Object.assign({}, oOptions);
        if (bInterval) {
            oFormatOptions.interval = true;
        }
        oFormatOptions.calendarType = sCalendarType;
        oFormatOptions.fallback = true;
        var oFallbackFormat = DateFormat.createInstance(oFormatOptions, oLocale, oInfo);
        oFallbackFormat.bIsFallback = true;
        return oFallbackFormat;
    });
};
DateFormat._createFallbackOptionsWithoutDelimiter = function (sBasePattern) {
    var rNonDateFields = /[^dMyGU]/g, oDayReplace = {
            regex: /d+/g,
            replace: 'dd'
        }, oMonthReplace = {
            regex: /M+/g,
            replace: 'MM'
        }, oYearReplace = {
            regex: /[yU]+/g,
            replace: [
                'yyyy',
                'yy'
            ]
        };
    sBasePattern = sBasePattern.replace(rNonDateFields, '');
    sBasePattern = sBasePattern.replace(oDayReplace.regex, oDayReplace.replace);
    sBasePattern = sBasePattern.replace(oMonthReplace.regex, oMonthReplace.replace);
    return oYearReplace.replace.map(function (sReplace) {
        return {
            pattern: sBasePattern.replace(oYearReplace.regex, sReplace),
            strictParsing: true
        };
    });
};
var oParseHelper = {
    isNumber: function (iCharCode) {
        return iCharCode >= 48 && iCharCode <= 57;
    },
    findNumbers: function (sValue, iMaxLength) {
        var iLength = 0;
        while (iLength < iMaxLength && this.isNumber(sValue.charCodeAt(iLength))) {
            iLength++;
        }
        if (typeof sValue !== 'string') {
            sValue = sValue.toString();
        }
        return sValue.substr(0, iLength);
    },
    findEntry: function (sValue, aList) {
        var iFoundIndex = -1, iMatchedLength = 0;
        for (var j = 0; j < aList.length; j++) {
            if (aList[j] && aList[j].length > iMatchedLength && sValue.indexOf(aList[j]) === 0) {
                iFoundIndex = j;
                iMatchedLength = aList[j].length;
            }
        }
        return {
            index: iFoundIndex,
            value: iFoundIndex === -1 ? null : aList[iFoundIndex]
        };
    },
    parseTZ: function (sValue, bISO) {
        var iLength = 0;
        var iTZFactor = sValue.charAt(0) == '+' ? -1 : 1;
        var sPart;
        iLength++;
        sPart = this.findNumbers(sValue.substr(iLength), 2);
        var iTZDiffHour = parseInt(sPart);
        iLength += 2;
        if (bISO) {
            iLength++;
        }
        sPart = this.findNumbers(sValue.substr(iLength), 2);
        iLength += 2;
        var iTZDiff = parseInt(sPart);
        return {
            length: iLength,
            tzDiff: (iTZDiff + 60 * iTZDiffHour) * iTZFactor
        };
    },
    checkValid: function (sType, bPartInvalid, oFormat) {
        if (sType in oFormat.oRequiredParts && bPartInvalid) {
            return false;
        }
    }
};
DateFormat.prototype.oSymbols = {
    '': {
        name: 'text',
        format: function (oField, oDate, bUTC, oFormat) {
            return oField.value;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sChar;
            var bValid = true;
            var iValueIndex = 0;
            var iPatternIndex = 0;
            var sDelimiter = '-~\u2010\u2011\u2012\u2013\u2014\uFE58\uFE63\uFF0D\uFF5E';
            for (; iPatternIndex < oPart.value.length; iPatternIndex++) {
                sChar = oPart.value.charAt(iPatternIndex);
                if (sChar === ' ') {
                    while (sValue.charAt(iValueIndex) === ' ') {
                        iValueIndex++;
                    }
                } else if (sDelimiter.includes(sChar)) {
                    if (!sDelimiter.includes(sValue.charAt(iValueIndex))) {
                        bValid = false;
                    }
                    iValueIndex++;
                } else {
                    if (sValue.charAt(iValueIndex) !== sChar) {
                        bValid = false;
                    }
                    iValueIndex++;
                }
                if (!bValid) {
                    break;
                }
            }
            if (bValid) {
                return { length: iValueIndex };
            } else {
                var bPartInvalid = false;
                if (oConfig.index < oConfig.formatArray.length - 1) {
                    bPartInvalid = oConfig.formatArray[oConfig.index + 1].type in oFormat.oRequiredParts;
                }
                return { valid: oParseHelper.checkValid(oPart.type, bPartInvalid, oFormat) };
            }
        }
    },
    'G': {
        name: 'era',
        format: function (oField, oDate, bUTC, oFormat) {
            var iEra = bUTC ? oDate.getUTCEra() : oDate.getEra();
            if (oField.digits <= 3) {
                return oFormat.aErasAbbrev[iEra];
            } else if (oField.digits === 4) {
                return oFormat.aErasWide[iEra];
            } else {
                return oFormat.aErasNarrow[iEra];
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aErasVariants = [
                oFormat.aErasWide,
                oFormat.aErasAbbrev,
                oFormat.aErasNarrow
            ];
            for (var i = 0; i < aErasVariants.length; i++) {
                var aVariants = aErasVariants[i];
                var oFound = oParseHelper.findEntry(sValue, aVariants);
                if (oFound.index !== -1) {
                    return {
                        era: oFound.index,
                        length: oFound.value.length
                    };
                }
            }
            return {
                era: oFormat.aErasWide.length - 1,
                valid: oParseHelper.checkValid(oPart.type, true, oFormat)
            };
        }
    },
    'y': {
        name: 'year',
        format: function (oField, oDate, bUTC, oFormat) {
            var iYear = bUTC ? oDate.getUTCFullYear() : oDate.getFullYear();
            var sYear = String(iYear);
            var sCalendarType = oFormat.oFormatOptions.calendarType;
            if (oField.digits == 2 && sYear.length > 2) {
                sYear = sYear.substr(sYear.length - 2);
            }
            if (sCalendarType != CalendarType$1.Japanese && oField.digits == 1 && iYear < 100) {
                sYear = sYear.padStart(4, '0');
            }
            return sYear.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sCalendarType = oFormat.oFormatOptions.calendarType;
            var sPart;
            if (oPart.digits == 1) {
                sPart = oParseHelper.findNumbers(sValue, 4);
            } else if (oPart.digits == 2) {
                sPart = oParseHelper.findNumbers(sValue, 2);
            } else {
                sPart = oParseHelper.findNumbers(sValue, oPart.digits);
            }
            var iYear = parseInt(sPart);
            if (sCalendarType != CalendarType$1.Japanese && sPart.length <= 2) {
                var oCurrentDate = UniversalDate.getInstance(new Date(), sCalendarType), iCurrentYear = oCurrentDate.getFullYear(), iCurrentCentury = Math.floor(iCurrentYear / 100), iYearDiff = iCurrentCentury * 100 + iYear - iCurrentYear;
                if (iYearDiff < -70) {
                    iYear += (iCurrentCentury + 1) * 100;
                } else if (iYearDiff < 30) {
                    iYear += iCurrentCentury * 100;
                } else {
                    iYear += (iCurrentCentury - 1) * 100;
                }
            }
            return {
                length: sPart.length,
                valid: oParseHelper.checkValid(oPart.type, sPart === '', oFormat),
                year: iYear
            };
        }
    },
    'Y': {
        name: 'weekYear',
        format: function (oField, oDate, bUTC, oFormat) {
            var oWeek = bUTC ? oDate.getUTCWeek() : oDate.getWeek();
            var iWeekYear = oWeek.year;
            var sWeekYear = String(iWeekYear);
            var sCalendarType = oFormat.oFormatOptions.calendarType;
            if (oField.digits == 2 && sWeekYear.length > 2) {
                sWeekYear = sWeekYear.substr(sWeekYear.length - 2);
            }
            if (sCalendarType != CalendarType$1.Japanese && oField.digits == 1 && iWeekYear < 100) {
                sWeekYear = sWeekYear.padStart(4, '0');
            }
            return sWeekYear.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sCalendarType = oFormat.oFormatOptions.calendarType;
            var sPart;
            if (oPart.digits == 1) {
                sPart = oParseHelper.findNumbers(sValue, 4);
            } else if (oPart.digits == 2) {
                sPart = oParseHelper.findNumbers(sValue, 2);
            } else {
                sPart = oParseHelper.findNumbers(sValue, oPart.digits);
            }
            var iYear = parseInt(sPart);
            var iWeekYear;
            if (sCalendarType != CalendarType$1.Japanese && sPart.length <= 2) {
                var oCurrentDate = UniversalDate.getInstance(new Date(), sCalendarType), iCurrentYear = oCurrentDate.getFullYear(), iCurrentCentury = Math.floor(iCurrentYear / 100), iYearDiff = iCurrentCentury * 100 + iWeekYear - iCurrentYear;
                if (iYearDiff < -70) {
                    iWeekYear += (iCurrentCentury + 1) * 100;
                } else if (iYearDiff < 30) {
                    iWeekYear += iCurrentCentury * 100;
                } else {
                    iWeekYear += (iCurrentCentury - 1) * 100;
                }
            }
            return {
                length: sPart.length,
                valid: oParseHelper.checkValid(oPart.type, sPart === '', oFormat),
                year: iYear,
                weekYear: iWeekYear
            };
        }
    },
    'M': {
        name: 'month',
        format: function (oField, oDate, bUTC, oFormat) {
            var iMonth = bUTC ? oDate.getUTCMonth() : oDate.getMonth();
            if (oField.digits == 3) {
                return oFormat.aMonthsAbbrev[iMonth];
            } else if (oField.digits == 4) {
                return oFormat.aMonthsWide[iMonth];
            } else if (oField.digits > 4) {
                return oFormat.aMonthsNarrow[iMonth];
            } else {
                return String(iMonth + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aMonthsVariants = [
                oFormat.aMonthsWide,
                oFormat.aMonthsWideSt,
                oFormat.aMonthsAbbrev,
                oFormat.aMonthsAbbrevSt,
                oFormat.aMonthsNarrow,
                oFormat.aMonthsNarrowSt
            ];
            var bValid;
            var iMonth;
            var sPart;
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
                iMonth = parseInt(sPart) - 1;
                if (oConfig.strict && (iMonth > 11 || iMonth < 0)) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aMonthsVariants.length; i++) {
                    var aVariants = aMonthsVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants);
                    if (oFound.index !== -1) {
                        return {
                            month: oFound.index,
                            length: oFound.value.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                month: iMonth,
                length: sPart ? sPart.length : 0,
                valid: bValid
            };
        }
    },
    'L': {
        name: 'monthStandalone',
        format: function (oField, oDate, bUTC, oFormat) {
            var iMonth = bUTC ? oDate.getUTCMonth() : oDate.getMonth();
            if (oField.digits == 3) {
                return oFormat.aMonthsAbbrevSt[iMonth];
            } else if (oField.digits == 4) {
                return oFormat.aMonthsWideSt[iMonth];
            } else if (oField.digits > 4) {
                return oFormat.aMonthsNarrowSt[iMonth];
            } else {
                return String(iMonth + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aMonthsVariants = [
                oFormat.aMonthsWide,
                oFormat.aMonthsWideSt,
                oFormat.aMonthsAbbrev,
                oFormat.aMonthsAbbrevSt,
                oFormat.aMonthsNarrow,
                oFormat.aMonthsNarrowSt
            ];
            var bValid;
            var iMonth;
            var sPart;
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
                iMonth = parseInt(sPart) - 1;
                if (oConfig.strict && (iMonth > 11 || iMonth < 0)) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aMonthsVariants.length; i++) {
                    var aVariants = aMonthsVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants);
                    if (oFound.index !== -1) {
                        return {
                            month: oFound.index,
                            length: oFound.value.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                month: iMonth,
                length: sPart ? sPart.length : 0,
                valid: bValid
            };
        }
    },
    'w': {
        name: 'weekInYear',
        format: function (oField, oDate, bUTC, oFormat) {
            var oWeek = bUTC ? oDate.getUTCWeek() : oDate.getWeek();
            var iWeek = oWeek.week;
            var sWeek = String(iWeek + 1);
            if (oField.digits < 3) {
                sWeek = sWeek.padStart(oField.digits, '0');
            } else {
                sWeek = oFormat.oLocaleData.getCalendarWeek(oField.digits === 3 ? 'narrow' : 'wide', sWeek.padStart(2, '0'));
            }
            return sWeek;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var sPart;
            var iWeek;
            var iLength = 0;
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, 2);
                iLength = sPart.length;
                iWeek = parseInt(sPart) - 1;
                bValid = oParseHelper.checkValid(oPart.type, !sPart, oFormat);
            } else {
                sPart = oFormat.oLocaleData.getCalendarWeek(oPart.digits === 3 ? 'narrow' : 'wide');
                sPart = sPart.replace('{0}', '[0-9]+');
                var rWeekNumber = new RegExp(sPart), oResult = rWeekNumber.exec(sValue);
                if (oResult) {
                    iLength = oResult[0].length;
                    iWeek = parseInt(oResult[0]) - 1;
                } else {
                    bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
                }
            }
            return {
                length: iLength,
                valid: bValid,
                week: iWeek
            };
        }
    },
    'W': {
        name: 'weekInMonth',
        format: function (oField, oDate, bUTC, oFormat) {
            return '';
        },
        parse: function () {
            return {};
        }
    },
    'D': {
        name: 'dayInYear',
        format: function (oField, oDate, bUTC, oFormat) {
        },
        parse: function () {
            return {};
        }
    },
    'd': {
        name: 'day',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDate = bUTC ? oDate.getUTCDate() : oDate.getDate();
            return String(iDate).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
            var bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
            var iDay = parseInt(sPart);
            if (oConfig.strict && (iDay > 31 || iDay < 1)) {
                bValid = false;
            }
            return {
                day: iDay,
                length: sPart.length,
                valid: bValid
            };
        }
    },
    'Q': {
        name: 'quarter',
        format: function (oField, oDate, bUTC, oFormat) {
            var iQuarter = bUTC ? oDate.getUTCQuarter() : oDate.getQuarter();
            if (oField.digits == 3) {
                return oFormat.aQuartersAbbrev[iQuarter];
            } else if (oField.digits == 4) {
                return oFormat.aQuartersWide[iQuarter];
            } else if (oField.digits > 4) {
                return oFormat.aQuartersNarrow[iQuarter];
            } else {
                return String(iQuarter + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var iQuarter;
            var sPart;
            var aQuartersVariants = [
                oFormat.aQuartersWide,
                oFormat.aQuartersWideSt,
                oFormat.aQuartersAbbrev,
                oFormat.aQuartersAbbrevSt,
                oFormat.aQuartersNarrow,
                oFormat.aQuartersNarrowSt
            ];
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
                iQuarter = parseInt(sPart) - 1;
                if (oConfig.strict && iQuarter > 3) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aQuartersVariants.length; i++) {
                    var aVariants = aQuartersVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants);
                    if (oFound.index !== -1) {
                        return {
                            quarter: oFound.index,
                            length: oFound.value.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                length: sPart ? sPart.length : 0,
                quarter: iQuarter,
                valid: bValid
            };
        }
    },
    'q': {
        name: 'quarterStandalone',
        format: function (oField, oDate, bUTC, oFormat) {
            var iQuarter = bUTC ? oDate.getUTCQuarter() : oDate.getQuarter();
            if (oField.digits == 3) {
                return oFormat.aQuartersAbbrevSt[iQuarter];
            } else if (oField.digits == 4) {
                return oFormat.aQuartersWideSt[iQuarter];
            } else if (oField.digits > 4) {
                return oFormat.aQuartersNarrowSt[iQuarter];
            } else {
                return String(iQuarter + 1).padStart(oField.digits, '0');
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var iQuarter;
            var sPart;
            var aQuartersVariants = [
                oFormat.aQuartersWide,
                oFormat.aQuartersWideSt,
                oFormat.aQuartersAbbrev,
                oFormat.aQuartersAbbrevSt,
                oFormat.aQuartersNarrow,
                oFormat.aQuartersNarrowSt
            ];
            if (oPart.digits < 3) {
                sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
                bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
                iQuarter = parseInt(sPart) - 1;
                if (oConfig.strict && iQuarter > 3) {
                    bValid = false;
                }
            } else {
                for (var i = 0; i < aQuartersVariants.length; i++) {
                    var aVariants = aQuartersVariants[i];
                    var oFound = oParseHelper.findEntry(sValue, aVariants);
                    if (oFound.index !== -1) {
                        return {
                            quarter: oFound.index,
                            length: oFound.value.length
                        };
                    }
                }
                bValid = oParseHelper.checkValid(oPart.type, true, oFormat);
            }
            return {
                length: sPart ? sPart.length : 0,
                quarter: iQuarter,
                valid: bValid
            };
        }
    },
    'F': {
        name: 'dayOfWeekInMonth',
        format: function (oField, oDate, bUTC, oFormat) {
            return '';
        },
        parse: function () {
            return {};
        }
    },
    'E': {
        name: 'dayNameInWeek',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDay = bUTC ? oDate.getUTCDay() : oDate.getDay();
            if (oField.digits < 4) {
                return oFormat.aDaysAbbrev[iDay];
            } else if (oField.digits == 4) {
                return oFormat.aDaysWide[iDay];
            } else if (oField.digits == 5) {
                return oFormat.aDaysNarrow[iDay];
            } else {
                return oFormat.aDaysShort[iDay];
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aDaysVariants = [
                oFormat.aDaysWide,
                oFormat.aDaysWideSt,
                oFormat.aDaysAbbrev,
                oFormat.aDaysAbbrevSt,
                oFormat.aDaysShort,
                oFormat.aDaysShortSt,
                oFormat.aDaysNarrow,
                oFormat.aDaysNarrowSt
            ];
            for (var i = 0; i < aDaysVariants.length; i++) {
                var aVariants = aDaysVariants[i];
                var oFound = oParseHelper.findEntry(sValue, aVariants);
                if (oFound.index !== -1) {
                    return {
                        dayOfWeek: oFound.index,
                        length: oFound.value.length
                    };
                }
            }
        }
    },
    'c': {
        name: 'dayNameInWeekStandalone',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDay = bUTC ? oDate.getUTCDay() : oDate.getDay();
            if (oField.digits < 4) {
                return oFormat.aDaysAbbrevSt[iDay];
            } else if (oField.digits == 4) {
                return oFormat.aDaysWideSt[iDay];
            } else if (oField.digits == 5) {
                return oFormat.aDaysNarrowSt[iDay];
            } else {
                return oFormat.aDaysShortSt[iDay];
            }
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var aDaysVariants = [
                oFormat.aDaysWide,
                oFormat.aDaysWideSt,
                oFormat.aDaysAbbrev,
                oFormat.aDaysAbbrevSt,
                oFormat.aDaysShort,
                oFormat.aDaysShortSt,
                oFormat.aDaysNarrow,
                oFormat.aDaysNarrowSt
            ];
            for (var i = 0; i < aDaysVariants.length; i++) {
                var aVariants = aDaysVariants[i];
                var oFound = oParseHelper.findEntry(sValue, aVariants);
                if (oFound.index !== -1) {
                    return {
                        day: oFound.index,
                        length: oFound.value.length
                    };
                }
            }
        }
    },
    'u': {
        name: 'dayNumberOfWeek',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDay = bUTC ? oDate.getUTCDay() : oDate.getDay();
            return oFormat._adaptDayOfWeek(iDay);
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, oPart.digits);
            return {
                dayNumberOfWeek: parseInt(sPart),
                length: sPart.length
            };
        }
    },
    'a': {
        name: 'amPmMarker',
        format: function (oField, oDate, bUTC, oFormat) {
            var iDayPeriod = bUTC ? oDate.getUTCDayPeriod() : oDate.getDayPeriod();
            return oFormat.aDayPeriods[iDayPeriod];
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bPM;
            var iLength;
            var sAM = oFormat.aDayPeriods[0], sPM = oFormat.aDayPeriods[1];
            var rAMPM = /[aApP](?:\.)?[mM](?:\.)?/;
            var aMatch = sValue.match(rAMPM);
            var bVariant = aMatch && aMatch.index === 0;
            if (bVariant) {
                sValue = aMatch[0].replace(/\./g, '').toLowerCase() + sValue.substring(aMatch[0].length);
                sAM = sAM.replace(/\./g, '').toLowerCase();
                sPM = sPM.replace(/\./g, '').toLowerCase();
            }
            if (sValue.indexOf(sAM) === 0) {
                bPM = false;
                iLength = bVariant ? aMatch[0].length : sAM.length;
            } else if (sValue.indexOf(sPM) === 0) {
                bPM = true;
                iLength = bVariant ? aMatch[0].length : sPM.length;
            }
            return {
                pm: bPM,
                length: iLength
            };
        }
    },
    'H': {
        name: 'hour0_23',
        format: function (oField, oDate, bUTC, oFormat) {
            var iHours = bUTC ? oDate.getUTCHours() : oDate.getHours();
            return String(iHours).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
            var iHours = parseInt(sPart);
            bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
            if (oConfig.strict && iHours > 23) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                valid: bValid
            };
        }
    },
    'k': {
        name: 'hour1_24',
        format: function (oField, oDate, bUTC, oFormat) {
            var iHours = bUTC ? oDate.getUTCHours() : oDate.getHours();
            var sHours = iHours === 0 ? '24' : String(iHours);
            return sHours.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
            var iHours = parseInt(sPart);
            bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
            if (iHours == 24) {
                iHours = 0;
            }
            if (oConfig.strict && iHours > 23) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                valid: bValid
            };
        }
    },
    'K': {
        name: 'hour0_11',
        format: function (oField, oDate, bUTC, oFormat) {
            var iHours = bUTC ? oDate.getUTCHours() : oDate.getHours();
            var sHours = String(iHours > 11 ? iHours - 12 : iHours);
            return sHours.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
            var iHours = parseInt(sPart);
            bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
            if (oConfig.strict && iHours > 11) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                valid: bValid
            };
        }
    },
    'h': {
        name: 'hour1_12',
        format: function (oField, oDate, bUTC, oFormat) {
            var iHours = bUTC ? oDate.getUTCHours() : oDate.getHours();
            var sHours;
            if (iHours > 12) {
                sHours = String(iHours - 12);
            } else if (iHours == 0) {
                sHours = '12';
            } else {
                sHours = String(iHours);
            }
            return sHours.padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bPM = oConfig.dateValue.pm;
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
            var iHours = parseInt(sPart);
            var bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
            if (iHours == 12) {
                iHours = 0;
                bPM = bPM === undefined ? true : bPM;
            }
            if (oConfig.strict && iHours > 11) {
                bValid = false;
            }
            return {
                hour: iHours,
                length: sPart.length,
                pm: bPM,
                valid: bValid
            };
        }
    },
    'm': {
        name: 'minute',
        format: function (oField, oDate, bUTC, oFormat) {
            var iMinutes = bUTC ? oDate.getUTCMinutes() : oDate.getMinutes();
            return String(iMinutes).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
            var iMinutes = parseInt(sPart);
            bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
            if (oConfig.strict && iMinutes > 59) {
                bValid = false;
            }
            return {
                length: sPart.length,
                minute: iMinutes,
                valid: bValid
            };
        }
    },
    's': {
        name: 'second',
        format: function (oField, oDate, bUTC, oFormat) {
            var iSeconds = bUTC ? oDate.getUTCSeconds() : oDate.getSeconds();
            return String(iSeconds).padStart(oField.digits, '0');
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var bValid;
            var sPart = oParseHelper.findNumbers(sValue, Math.max(oPart.digits, 2));
            var iSeconds = parseInt(sPart);
            bValid = oParseHelper.checkValid(oPart.type, sPart === '', oFormat);
            if (oConfig.strict && iSeconds > 59) {
                bValid = false;
            }
            return {
                length: sPart.length,
                second: iSeconds,
                valid: bValid
            };
        }
    },
    'S': {
        name: 'fractionalsecond',
        format: function (oField, oDate, bUTC, oFormat) {
            var iMilliseconds = bUTC ? oDate.getUTCMilliseconds() : oDate.getMilliseconds();
            var sMilliseconds = String(iMilliseconds);
            var sFractionalseconds = sMilliseconds.padStart(3, '0');
            sFractionalseconds = sFractionalseconds.substr(0, oField.digits);
            sFractionalseconds = sFractionalseconds.padEnd(oField.digits, '0');
            return sFractionalseconds;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var sPart = oParseHelper.findNumbers(sValue, oPart.digits);
            var iLength = sPart.length;
            sPart = sPart.substr(0, 3);
            sPart = sPart.padEnd(3, '0');
            var iMilliseconds = parseInt(sPart);
            return {
                length: iLength,
                millisecond: iMilliseconds
            };
        }
    },
    'z': {
        name: 'timezoneGeneral',
        format: function (oField, oDate, bUTC, oFormat) {
            if (oField.digits > 3 && oDate.getTimezoneLong()) {
                return oDate.getTimezoneLong();
            } else if (oDate.getTimezoneShort()) {
                return oDate.getTimezoneShort();
            }
            var sTimeZone = 'GMT';
            var iTZOffset = Math.abs(oDate.getTimezoneOffset());
            var bPositiveOffset = oDate.getTimezoneOffset() > 0;
            var iHourOffset = Math.floor(iTZOffset / 60);
            var iMinuteOffset = iTZOffset % 60;
            if (!bUTC && iTZOffset != 0) {
                sTimeZone += bPositiveOffset ? '-' : '+';
                sTimeZone += String(iHourOffset).padStart(2, '0');
                sTimeZone += ':';
                sTimeZone += String(iMinuteOffset).padStart(2, '0');
            } else {
                sTimeZone += 'Z';
            }
            return sTimeZone;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            var iLength = 0;
            var iTZDiff;
            var oTZ = sValue.substring(0, 3);
            if (oTZ === 'GMT' || oTZ === 'UTC') {
                iLength = 3;
            } else if (sValue.substring(0, 2) === 'UT') {
                iLength = 2;
            } else if (sValue.charAt(0) == 'Z') {
                iLength = 1;
                iTZDiff = 0;
            } else {
                return { error: 'cannot be parsed correcly by sap.ui.core.format.DateFormat: The given timezone is not supported!' };
            }
            if (sValue.charAt(0) != 'Z') {
                var oParsedTZ = oParseHelper.parseTZ(sValue.substr(iLength), true);
                iLength += oParsedTZ.length;
                iTZDiff = oParsedTZ.tzDiff;
            }
            return {
                length: iLength,
                tzDiff: iTZDiff
            };
        }
    },
    'Z': {
        name: 'timezoneRFC822',
        format: function (oField, oDate, bUTC, oFormat) {
            var iTZOffset = Math.abs(oDate.getTimezoneOffset());
            var bPositiveOffset = oDate.getTimezoneOffset() > 0;
            var iHourOffset = Math.floor(iTZOffset / 60);
            var iMinuteOffset = iTZOffset % 60;
            var sTimeZone = '';
            if (!bUTC && iTZOffset != 0) {
                sTimeZone += bPositiveOffset ? '-' : '+';
                sTimeZone += String(iHourOffset).padStart(2, '0');
                sTimeZone += String(iMinuteOffset).padStart(2, '0');
            }
            return sTimeZone;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            return oParseHelper.parseTZ(sValue, false);
        }
    },
    'X': {
        name: 'timezoneISO8601',
        format: function (oField, oDate, bUTC, oFormat) {
            var iTZOffset = Math.abs(oDate.getTimezoneOffset());
            var bPositiveOffset = oDate.getTimezoneOffset() > 0;
            var iHourOffset = Math.floor(iTZOffset / 60);
            var iMinuteOffset = iTZOffset % 60;
            var sTimeZone = '';
            if (!bUTC && iTZOffset != 0) {
                sTimeZone += bPositiveOffset ? '-' : '+';
                sTimeZone += String(iHourOffset).padStart(2, '0');
                sTimeZone += ':';
                sTimeZone += String(iMinuteOffset).padStart(2, '0');
            } else {
                sTimeZone += 'Z';
            }
            return sTimeZone;
        },
        parse: function (sValue, oPart, oFormat, oConfig) {
            if (sValue.charAt(0) == 'Z') {
                return {
                    length: 1,
                    tzDiff: 0
                };
            } else {
                return oParseHelper.parseTZ(sValue, true);
            }
        }
    }
};
DateFormat.prototype._format = function (oJSDate, bUTC) {
    if (this.oFormatOptions.relative) {
        var sRes = this.formatRelative(oJSDate, bUTC, this.oFormatOptions.relativeRange);
        if (sRes) {
            return sRes;
        }
    }
    var sCalendarType = this.oFormatOptions.calendarType;
    var oDate = UniversalDate.getInstance(oJSDate, sCalendarType);
    var aBuffer = [], oPart, sResult, sSymbol;
    for (var i = 0; i < this.aFormatArray.length; i++) {
        oPart = this.aFormatArray[i];
        sSymbol = oPart.symbol || '';
        aBuffer.push(this.oSymbols[sSymbol].format(oPart, oDate, bUTC, this));
    }
    sResult = aBuffer.join('');
    if (Core.getConfiguration().getOriginInfo()) {
        sResult = new String(sResult);
        sResult.originInfo = {
            source: 'Common Locale Data Repository',
            locale: this.oLocale.toString(),
            style: this.oFormatOptions.style,
            pattern: this.oFormatOptions.pattern
        };
    }
    return sResult;
};
DateFormat.prototype.format = function (vJSDate, bUTC) {
    var sCalendarType = this.oFormatOptions.calendarType, sResult;
    if (bUTC === undefined) {
        bUTC = this.oFormatOptions.UTC;
    }
    if (Array.isArray(vJSDate)) {
        if (!this.oFormatOptions.interval) {
            Log.error('Non-interval DateFormat can\'t format more than one date instance.');
            return '';
        }
        if (vJSDate.length !== 2) {
            Log.error('Interval DateFormat can only format with 2 date instances but ' + vJSDate.length + ' is given.');
            return '';
        }
        if (this.oFormatOptions.singleIntervalValue) {
            if (vJSDate[0] === null) {
                Log.error('First date instance which is passed to the interval DateFormat shouldn\'t be null.');
                return '';
            }
            if (vJSDate[1] === null) {
                sResult = this._format(vJSDate[0], bUTC);
            }
        }
        if (sResult === undefined) {
            var bValid = vJSDate.every(function (oJSDate) {
                return oJSDate && !isNaN(oJSDate.getTime());
            });
            if (!bValid) {
                Log.error('At least one date instance which is passed to the interval DateFormat isn\'t valid.');
                return '';
            }
            sResult = this._formatInterval(vJSDate, bUTC);
        }
    } else {
        if (!vJSDate || isNaN(vJSDate.getTime())) {
            Log.error('The given date instance isn\'t valid.');
            return '';
        }
        if (this.oFormatOptions.interval) {
            Log.error('Interval DateFormat expects an array with two dates for the first argument but only one date is given.');
            return '';
        }
        sResult = this._format(vJSDate, bUTC);
    }
    if (sCalendarType == CalendarType$1.Japanese && this.oLocale.getLanguage() === 'ja') {
        sResult = sResult.replace(/(^|[^\d])1年/g, '$1元年');
    }
    return sResult;
};
DateFormat.prototype._formatInterval = function (aJSDates, bUTC) {
    var sCalendarType = this.oFormatOptions.calendarType;
    var oFromDate = UniversalDate.getInstance(aJSDates[0], sCalendarType);
    var oToDate = UniversalDate.getInstance(aJSDates[1], sCalendarType);
    var oDate;
    var oPart;
    var sSymbol;
    var aBuffer = [];
    var sPattern;
    var aFormatArray = [];
    var oDiffField = this._getGreatestDiffField([
        oFromDate,
        oToDate
    ], bUTC);
    if (!oDiffField) {
        return this._format(aJSDates[0], bUTC);
    }
    if (this.oFormatOptions.format) {
        sPattern = this.oLocaleData.getCustomIntervalPattern(this.oFormatOptions.format, oDiffField, sCalendarType);
    } else {
        sPattern = this.oLocaleData.getCombinedIntervalPattern(this.oFormatOptions.pattern, sCalendarType);
    }
    aFormatArray = this.parseCldrDatePattern(sPattern);
    oDate = oFromDate;
    for (var i = 0; i < aFormatArray.length; i++) {
        oPart = aFormatArray[i];
        sSymbol = oPart.symbol || '';
        if (oPart.repeat) {
            oDate = oToDate;
        }
        aBuffer.push(this.oSymbols[sSymbol].format(oPart, oDate, bUTC, this));
    }
    return aBuffer.join('');
};
var mFieldToGroup = {
    Era: 'Era',
    FullYear: 'Year',
    Quarter: 'Quarter',
    Month: 'Month',
    Week: 'Week',
    Date: 'Day',
    DayPeriod: 'DayPeriod',
    Hours: 'Hour',
    Minutes: 'Minute',
    Seconds: 'Second'
};
DateFormat.prototype._getGreatestDiffField = function (aDates, bUTC) {
    var bDiffFound = false, mDiff = {};
    this.aIntervalCompareFields.forEach(function (sField) {
        var sGetterPrefix = 'get' + (bUTC ? 'UTC' : ''), sMethodName = sGetterPrefix + sField, sFieldGroup = mFieldToGroup[sField], vFromValue = aDates[0][sMethodName].apply(aDates[0]), vToValue = aDates[1][sMethodName].apply(aDates[1]);
        if (!fnEqual(vFromValue, vToValue)) {
            bDiffFound = true;
            mDiff[sFieldGroup] = true;
        }
    });
    if (bDiffFound) {
        return mDiff;
    }
    return null;
};
DateFormat.prototype._parse = function (sValue, aFormatArray, bUTC, bStrict) {
    var iIndex = 0, oPart, sSubValue, oResult;
    var oDateValue = { valid: true };
    var oParseConf = {
        formatArray: aFormatArray,
        dateValue: oDateValue,
        strict: bStrict
    };
    for (var i = 0; i < aFormatArray.length; i++) {
        sSubValue = sValue.substr(iIndex);
        oPart = aFormatArray[i];
        oParseConf.index = i;
        oResult = this.oSymbols[oPart.symbol || ''].parse(sSubValue, oPart, this, oParseConf) || {};
        oDateValue = fnExtend(oDateValue, oResult);
        if (oResult.valid === false) {
            break;
        }
        iIndex += oResult.length || 0;
    }
    oDateValue.index = iIndex;
    if (oDateValue.pm) {
        oDateValue.hour += 12;
    }
    if (oDateValue.dayNumberOfWeek === undefined && oDateValue.dayOfWeek !== undefined) {
        oDateValue.dayNumberOfWeek = this._adaptDayOfWeek(oDateValue.dayOfWeek);
    }
    if (oDateValue.quarter !== undefined && oDateValue.month === undefined && oDateValue.day === undefined) {
        oDateValue.month = 3 * oDateValue.quarter;
        oDateValue.day = 1;
    }
    return oDateValue;
};
DateFormat.prototype._parseInterval = function (sValue, sCalendarType, bUTC, bStrict) {
    var aDateValues, iRepeat, oDateValue;
    this.intervalPatterns.some(function (sPattern) {
        var aFormatArray = this.parseCldrDatePattern(sPattern);
        iRepeat = undefined;
        for (var i = 0; i < aFormatArray.length; i++) {
            if (aFormatArray[i].repeat) {
                iRepeat = i;
                break;
            }
        }
        if (iRepeat === undefined) {
            oDateValue = this._parse(sValue, aFormatArray, bUTC, bStrict);
            if (oDateValue.index === 0 || oDateValue.index < sValue.length) {
                oDateValue.valid = false;
            }
            if (oDateValue.valid === false) {
                return;
            }
            aDateValues = [
                oDateValue,
                oDateValue
            ];
            return true;
        } else {
            aDateValues = [];
            oDateValue = this._parse(sValue, aFormatArray.slice(0, iRepeat), bUTC, bStrict);
            if (oDateValue.valid === false) {
                return;
            }
            aDateValues.push(oDateValue);
            var iLength = oDateValue.index;
            oDateValue = this._parse(sValue.substring(iLength), aFormatArray.slice(iRepeat), bUTC, bStrict);
            if (oDateValue.index === 0 || oDateValue.index + iLength < sValue.length) {
                oDateValue.valid = false;
            }
            if (oDateValue.valid === false) {
                return;
            }
            aDateValues.push(oDateValue);
            return true;
        }
    }.bind(this));
    return aDateValues;
};
var fnCreateDate = function (oDateValue, sCalendarType, bUTC, bStrict) {
    var oDate, iYear = typeof oDateValue.year === 'number' ? oDateValue.year : 1970;
    if (oDateValue.valid) {
        if (bUTC || oDateValue.tzDiff !== undefined) {
            oDate = UniversalDate.getInstance(new Date(0), sCalendarType);
            oDate.setUTCEra(oDateValue.era || UniversalDate.getCurrentEra(sCalendarType));
            oDate.setUTCFullYear(iYear);
            oDate.setUTCMonth(oDateValue.month || 0);
            oDate.setUTCDate(oDateValue.day || 1);
            oDate.setUTCHours(oDateValue.hour || 0);
            oDate.setUTCMinutes(oDateValue.minute || 0);
            oDate.setUTCSeconds(oDateValue.second || 0);
            oDate.setUTCMilliseconds(oDateValue.millisecond || 0);
            if (bStrict && (oDateValue.day || 1) !== oDate.getUTCDate()) {
                oDateValue.valid = false;
                oDate = undefined;
            } else {
                if (oDateValue.tzDiff) {
                    oDate.setUTCMinutes((oDateValue.minute || 0) + oDateValue.tzDiff);
                }
                if (oDateValue.week !== undefined && (oDateValue.month === undefined || oDateValue.day === undefined)) {
                    oDate.setUTCWeek({
                        year: oDateValue.weekYear || oDateValue.year,
                        week: oDateValue.week
                    });
                    if (oDateValue.dayNumberOfWeek !== undefined) {
                        oDate.setUTCDate(oDate.getUTCDate() + oDateValue.dayNumberOfWeek - 1);
                    }
                }
            }
        } else {
            oDate = UniversalDate.getInstance(new Date(1970, 0, 1, 0, 0, 0), sCalendarType);
            oDate.setEra(oDateValue.era || UniversalDate.getCurrentEra(sCalendarType));
            oDate.setFullYear(iYear);
            oDate.setMonth(oDateValue.month || 0);
            oDate.setDate(oDateValue.day || 1);
            oDate.setHours(oDateValue.hour || 0);
            oDate.setMinutes(oDateValue.minute || 0);
            oDate.setSeconds(oDateValue.second || 0);
            oDate.setMilliseconds(oDateValue.millisecond || 0);
            if (bStrict && (oDateValue.day || 1) !== oDate.getDate()) {
                oDateValue.valid = false;
                oDate = undefined;
            } else if (oDateValue.week !== undefined && (oDateValue.month === undefined || oDateValue.day === undefined)) {
                oDate.setWeek({
                    year: oDateValue.weekYear || oDateValue.year,
                    week: oDateValue.week
                });
                if (oDateValue.dayNumberOfWeek !== undefined) {
                    oDate.setDate(oDate.getDate() + oDateValue.dayNumberOfWeek - 1);
                }
            }
        }
        if (oDateValue.valid) {
            oDate = oDate.getJSDate();
            return oDate;
        }
    }
    return null;
};
function mergeWithoutOverwrite(object1, object2) {
    if (object1 === object2) {
        return object1;
    }
    var oMergedObject = {};
    Object.keys(object1).forEach(function (sKey) {
        oMergedObject[sKey] = object1[sKey];
    });
    Object.keys(object2).forEach(function (sKey) {
        if (!oMergedObject.hasOwnProperty(sKey)) {
            oMergedObject[sKey] = object2[sKey];
        }
    });
    return oMergedObject;
}
function isValidDateRange(oStartDate, oEndDate) {
    if (oStartDate.getTime() > oEndDate.getTime()) {
        return false;
    }
    return true;
}
DateFormat.prototype.parse = function (sValue, bUTC, bStrict) {
    sValue = sValue == null ? '' : String(sValue).trim();
    var oDateValue;
    var sCalendarType = this.oFormatOptions.calendarType;
    if (bUTC === undefined) {
        bUTC = this.oFormatOptions.UTC;
    }
    if (bStrict === undefined) {
        bStrict = this.oFormatOptions.strictParsing;
    }
    if (sCalendarType == CalendarType$1.Japanese && this.oLocale.getLanguage() === 'ja') {
        sValue = sValue.replace(/元年/g, '1年');
    }
    if (!this.oFormatOptions.interval) {
        var oJSDate = this.parseRelative(sValue, bUTC);
        if (oJSDate) {
            return oJSDate;
        }
        oDateValue = this._parse(sValue, this.aFormatArray, bUTC, bStrict);
        if (oDateValue.index === 0 || oDateValue.index < sValue.length) {
            oDateValue.valid = false;
        }
        oJSDate = fnCreateDate(oDateValue, sCalendarType, bUTC, bStrict);
        if (oJSDate) {
            return oJSDate;
        }
    } else {
        var aDateValues = this._parseInterval(sValue, sCalendarType, bUTC, bStrict);
        var oJSDate1, oJSDate2;
        if (aDateValues && aDateValues.length == 2) {
            var oDateValue1 = mergeWithoutOverwrite(aDateValues[0], aDateValues[1]);
            var oDateValue2 = mergeWithoutOverwrite(aDateValues[1], aDateValues[0]);
            oJSDate1 = fnCreateDate(oDateValue1, sCalendarType, bUTC, bStrict);
            oJSDate2 = fnCreateDate(oDateValue2, sCalendarType, bUTC, bStrict);
            if (oJSDate1 && oJSDate2) {
                if (this.oFormatOptions.singleIntervalValue && oJSDate1.getTime() === oJSDate2.getTime()) {
                    return [
                        oJSDate1,
                        null
                    ];
                }
                var bValid = isValidDateRange(oJSDate1, oJSDate2);
                if (bStrict && !bValid) {
                    Log.error('StrictParsing: Invalid date range. The given end date is before the start date.');
                    return [
                        null,
                        null
                    ];
                }
                return [
                    oJSDate1,
                    oJSDate2
                ];
            }
        }
    }
    if (!this.bIsFallback) {
        var vDate;
        this.aFallbackFormats.every(function (oFallbackFormat) {
            vDate = oFallbackFormat.parse(sValue, bUTC, bStrict);
            if (Array.isArray(vDate)) {
                return !(vDate[0] && vDate[1]);
            } else {
                return !vDate;
            }
        });
        return vDate;
    }
    if (!this.oFormatOptions.interval) {
        return null;
    } else {
        return [
            null,
            null
        ];
    }
};
DateFormat.prototype.parseCldrDatePattern = function (sPattern) {
    if (mCldrDatePattern[sPattern]) {
        return mCldrDatePattern[sPattern];
    }
    var aFormatArray = [], i, bQuoted = false, oCurrentObject = null, sState = '', sNewState = '', mAppeared = {}, bIntervalStartFound = false;
    for (i = 0; i < sPattern.length; i++) {
        var sCurChar = sPattern.charAt(i), sNextChar, sPrevChar, sPrevPrevChar;
        if (bQuoted) {
            if (sCurChar == '\'') {
                sPrevChar = sPattern.charAt(i - 1);
                sPrevPrevChar = sPattern.charAt(i - 2);
                sNextChar = sPattern.charAt(i + 1);
                if (sPrevChar == '\'' && sPrevPrevChar != '\'') {
                    bQuoted = false;
                } else if (sNextChar == '\'') {
                    i += 1;
                } else {
                    bQuoted = false;
                    continue;
                }
            }
            if (sState == 'text') {
                oCurrentObject.value += sCurChar;
            } else {
                oCurrentObject = {
                    type: 'text',
                    value: sCurChar
                };
                aFormatArray.push(oCurrentObject);
                sState = 'text';
            }
        } else {
            if (sCurChar == '\'') {
                bQuoted = true;
            } else if (this.oSymbols[sCurChar]) {
                sNewState = this.oSymbols[sCurChar].name;
                if (sState == sNewState) {
                    oCurrentObject.digits++;
                } else {
                    oCurrentObject = {
                        type: sNewState,
                        symbol: sCurChar,
                        digits: 1
                    };
                    aFormatArray.push(oCurrentObject);
                    sState = sNewState;
                    if (!bIntervalStartFound) {
                        if (mAppeared[sNewState]) {
                            oCurrentObject.repeat = true;
                            bIntervalStartFound = true;
                        } else {
                            mAppeared[sNewState] = true;
                        }
                    }
                }
            } else {
                if (sState == 'text') {
                    oCurrentObject.value += sCurChar;
                } else {
                    oCurrentObject = {
                        type: 'text',
                        value: sCurChar
                    };
                    aFormatArray.push(oCurrentObject);
                    sState = 'text';
                }
            }
        }
    }
    mCldrDatePattern[sPattern] = aFormatArray;
    return aFormatArray;
};
DateFormat.prototype.parseRelative = function (sValue, bUTC) {
    var aPatterns, oEntry, rPattern, oResult, iValue;
    if (!sValue) {
        return null;
    }
    aPatterns = this.oLocaleData.getRelativePatterns(this.aRelativeParseScales, this.oFormatOptions.relativeStyle);
    for (var i = 0; i < aPatterns.length; i++) {
        oEntry = aPatterns[i];
        rPattern = new RegExp('^\\s*' + oEntry.pattern.replace(/\{0\}/, '(\\d+)') + '\\s*$', 'i');
        oResult = rPattern.exec(sValue);
        if (oResult) {
            if (oEntry.value !== undefined) {
                return computeRelativeDate(oEntry.value, oEntry.scale);
            } else {
                iValue = parseInt(oResult[1]);
                return computeRelativeDate(iValue * oEntry.sign, oEntry.scale);
            }
        }
    }
    function computeRelativeDate(iDiff, sScale) {
        var iToday, oToday = new Date(), oJSDate;
        if (bUTC) {
            iToday = oToday.getTime();
        } else {
            iToday = Date.UTC(oToday.getFullYear(), oToday.getMonth(), oToday.getDate(), oToday.getHours(), oToday.getMinutes(), oToday.getSeconds(), oToday.getMilliseconds());
        }
        oJSDate = new Date(iToday);
        switch (sScale) {
        case 'second':
            oJSDate.setUTCSeconds(oJSDate.getUTCSeconds() + iDiff);
            break;
        case 'minute':
            oJSDate.setUTCMinutes(oJSDate.getUTCMinutes() + iDiff);
            break;
        case 'hour':
            oJSDate.setUTCHours(oJSDate.getUTCHours() + iDiff);
            break;
        case 'day':
            oJSDate.setUTCDate(oJSDate.getUTCDate() + iDiff);
            break;
        case 'week':
            oJSDate.setUTCDate(oJSDate.getUTCDate() + iDiff * 7);
            break;
        case 'month':
            oJSDate.setUTCMonth(oJSDate.getUTCMonth() + iDiff);
            break;
        case 'quarter':
            oJSDate.setUTCMonth(oJSDate.getUTCMonth() + iDiff * 3);
            break;
        case 'year':
            oJSDate.setUTCFullYear(oJSDate.getUTCFullYear() + iDiff);
            break;
        }
        if (bUTC) {
            return oJSDate;
        } else {
            return new Date(oJSDate.getUTCFullYear(), oJSDate.getUTCMonth(), oJSDate.getUTCDate(), oJSDate.getUTCHours(), oJSDate.getUTCMinutes(), oJSDate.getUTCSeconds(), oJSDate.getUTCMilliseconds());
        }
    }
};
DateFormat.prototype.formatRelative = function (oJSDate, bUTC, aRange) {
    var oToday = new Date(), oDateUTC, sScale = this.oFormatOptions.relativeScale || 'day', iDiff, sPattern, iDiffSeconds;
    iDiffSeconds = (oJSDate.getTime() - oToday.getTime()) / 1000;
    if (this.oFormatOptions.relativeScale == 'auto') {
        sScale = this._getScale(iDiffSeconds, this.aRelativeScales);
    }
    if (!aRange) {
        aRange = this._mRanges[sScale];
    }
    if (sScale == 'year' || sScale == 'month' || sScale == 'day') {
        oToday = new Date(Date.UTC(oToday.getFullYear(), oToday.getMonth(), oToday.getDate()));
        oDateUTC = new Date(0);
        if (bUTC) {
            oDateUTC.setUTCFullYear(oJSDate.getUTCFullYear(), oJSDate.getUTCMonth(), oJSDate.getUTCDate());
        } else {
            oDateUTC.setUTCFullYear(oJSDate.getFullYear(), oJSDate.getMonth(), oJSDate.getDate());
        }
        oJSDate = oDateUTC;
    }
    iDiff = this._getDifference(sScale, [
        oToday,
        oJSDate
    ]);
    if (this.oFormatOptions.relativeScale != 'auto' && (iDiff < aRange[0] || iDiff > aRange[1])) {
        return null;
    }
    sPattern = this.oLocaleData.getRelativePattern(sScale, iDiff, iDiffSeconds > 0, this.oFormatOptions.relativeStyle);
    return fnFormatMessage(sPattern, [Math.abs(iDiff)]);
};
DateFormat.prototype._mRanges = {
    second: [
        -60,
        60
    ],
    minute: [
        -60,
        60
    ],
    hour: [
        -24,
        24
    ],
    day: [
        -6,
        6
    ],
    week: [
        -4,
        4
    ],
    month: [
        -12,
        12
    ],
    year: [
        -10,
        10
    ]
};
DateFormat.prototype._mScales = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000,
    quarter: 7776000,
    year: 31536000
};
DateFormat.prototype._getScale = function (iDiffSeconds, aScales) {
    var sScale, sTestScale;
    iDiffSeconds = Math.abs(iDiffSeconds);
    for (var i = 0; i < aScales.length; i++) {
        sTestScale = aScales[i];
        if (iDiffSeconds >= this._mScales[sTestScale]) {
            sScale = sTestScale;
            break;
        }
    }
    if (!sScale) {
        sScale = aScales[aScales.length - 1];
    }
    return sScale;
};
function cutDateFields(oDate, iStartIndex) {
    var aFields = [
            'FullYear',
            'Month',
            'Date',
            'Hours',
            'Minutes',
            'Seconds',
            'Milliseconds'
        ], sMethodName;
    for (var i = iStartIndex; i < aFields.length; i++) {
        sMethodName = 'set' + aFields[iStartIndex];
        oDate[sMethodName].apply(oDate, [0]);
    }
}
var mRelativeDiffs = {
    year: function (oFromDate, oToDate) {
        return oToDate.getFullYear() - oFromDate.getFullYear();
    },
    month: function (oFromDate, oToDate) {
        return oToDate.getMonth() - oFromDate.getMonth() + this.year(oFromDate, oToDate) * 12;
    },
    week: function (oFromDate, oToDate, oFormat) {
        var iFromDay = oFormat._adaptDayOfWeek(oFromDate.getDay());
        var iToDay = oFormat._adaptDayOfWeek(oToDate.getDay());
        cutDateFields(oFromDate, 3);
        cutDateFields(oToDate, 3);
        return (oToDate.getTime() - oFromDate.getTime() - (iToDay - iFromDay) * oFormat._mScales.day * 1000) / (oFormat._mScales.week * 1000);
    },
    day: function (oFromDate, oToDate, oFormat) {
        cutDateFields(oFromDate, 3);
        cutDateFields(oToDate, 3);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.day * 1000);
    },
    hour: function (oFromDate, oToDate, oFormat) {
        cutDateFields(oFromDate, 4);
        cutDateFields(oToDate, 4);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.hour * 1000);
    },
    minute: function (oFromDate, oToDate, oFormat) {
        cutDateFields(oFromDate, 5);
        cutDateFields(oToDate, 5);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.minute * 1000);
    },
    second: function (oFromDate, oToDate, oFormat) {
        cutDateFields(oFromDate, 6);
        cutDateFields(oToDate, 6);
        return (oToDate.getTime() - oFromDate.getTime()) / (oFormat._mScales.second * 1000);
    }
};
DateFormat.prototype._adaptDayOfWeek = function (iDayOfWeek) {
    var iFirstDayOfWeek = LocaleData.getInstance(Core.getConfiguration().getFormatSettings().getFormatLocale()).getFirstDayOfWeek();
    var iDayNumberOfWeek = iDayOfWeek - (iFirstDayOfWeek - 1);
    if (iDayNumberOfWeek <= 0) {
        iDayNumberOfWeek += 7;
    }
    return iDayNumberOfWeek;
};
DateFormat.prototype._getDifference = function (sScale, aDates) {
    var oFromDate = aDates[0];
    var oToDate = aDates[1];
    return Math.round(mRelativeDiffs[sScale](oFromDate, oToDate, this));
};
DateFormat.prototype.getAllowedCharacters = function (aFormatArray) {
    if (this.oFormatOptions.relative) {
        return '';
    }
    var sAllowedCharacters = '';
    var bNumbers = false;
    var bAll = false;
    var oPart;
    for (var i = 0; i < aFormatArray.length; i++) {
        oPart = aFormatArray[i];
        switch (oPart.type) {
        case 'text':
            if (sAllowedCharacters.indexOf(oPart.value) < 0) {
                sAllowedCharacters += oPart.value;
            }
            break;
        case 'day':
        case 'year':
        case 'weekYear':
        case 'dayNumberOfWeek':
        case 'weekInYear':
        case 'hour0_23':
        case 'hour1_24':
        case 'hour0_11':
        case 'hour1_12':
        case 'minute':
        case 'second':
        case 'fractionalsecond':
            if (!bNumbers) {
                sAllowedCharacters += '0123456789';
                bNumbers = true;
            }
            break;
        case 'month':
        case 'monthStandalone':
            if (oPart.digits < 3) {
                if (!bNumbers) {
                    sAllowedCharacters += '0123456789';
                    bNumbers = true;
                }
            } else {
                bAll = true;
            }
            break;
        default:
            bAll = true;
            break;
        }
    }
    if (bAll) {
        sAllowedCharacters = '';
    }
    return sAllowedCharacters;
};

class CalendarDate {
	constructor() {
		let aArgs = arguments, // eslint-disable-line
			oJSDate,
			oNow,
			sCalendarType;

		switch (aArgs.length) {
		case 0: // defaults to the current date
			oNow = new Date();
			return this.constructor(oNow.getFullYear(), oNow.getMonth(), oNow.getDate());

		case 1: // CalendarDate
		case 2: // CalendarDate, sCalendarType
			if (!(aArgs[0] instanceof CalendarDate)) {
				throw new Error("Invalid arguments: the first argument must be of type sap.ui.unified.calendar.CalendarDate.");
			}
			sCalendarType = aArgs[1] ? aArgs[1] : aArgs[0]._oUDate.sCalendarType;
			// Use source.valueOf() (returns the same point of time regardless calendar type) instead of
			// source's getters to avoid non-gregorian Year, Month and Date may be used to construct a Gregorian date
			oJSDate = new Date(aArgs[0].valueOf());

			// Make this date really local. Now getters are safe.
			oJSDate.setFullYear(oJSDate.getUTCFullYear(), oJSDate.getUTCMonth(), oJSDate.getUTCDate());
			oJSDate.setHours(oJSDate.getUTCHours(), oJSDate.getUTCMinutes(), oJSDate.getUTCSeconds(), oJSDate.getUTCMilliseconds());

			this._oUDate = createUniversalUTCDate(oJSDate, sCalendarType);
			break;

		case 3: // year, month, date
		case 4: // year, month, date, sCalendarType
			checkNumericLike(aArgs[0], `Invalid year: ${aArgs[0]}`);
			checkNumericLike(aArgs[1], `Invalid month: ${aArgs[1]}`);
			checkNumericLike(aArgs[2], `Invalid date: ${aArgs[2]}`);

			oJSDate = new Date(0, 0, 1);
			oJSDate.setFullYear(aArgs[0], aArgs[1], aArgs[2]); // 2 digits year is not supported. If so, it is considered as full year as well.

			if (aArgs[3]) {
				sCalendarType = aArgs[3];
			}
			this._oUDate = createUniversalUTCDate(oJSDate, sCalendarType);
			break;

		default:
			throw new Error(`${"Invalid arguments. Accepted arguments are: 1) oCalendarDate, (optional)calendarType"
				+ "or 2) year, month, date, (optional) calendarType"}${aArgs}`);
		}
	}

	getYear() {
		return this._oUDate.getUTCFullYear();
	}

	setYear(year) {
		checkNumericLike(year, `Invalid year: ${year}`);
		this._oUDate.setUTCFullYear(year);
		return this;
	}

	getMonth() {
		return this._oUDate.getUTCMonth();
	}

	setMonth(month) {
		checkNumericLike(month, `Invalid month: ${month}`);
		this._oUDate.setUTCMonth(month);
		return this;
	}

	getDate() {
		return this._oUDate.getUTCDate();
	}

	setDate(date) {
		checkNumericLike(date, `Invalid date: ${date}`);
		this._oUDate.setUTCDate(date);
		return this;
	}

	getDay() {
		return this._oUDate.getUTCDay();
	}

	getCalendarType() {
		return this._oUDate.sCalendarType;
	}

	isBefore(oCalendarDate) {
		checkCalendarDate(oCalendarDate);
		return this.valueOf() < oCalendarDate.valueOf();
	}

	isAfter(oCalendarDate) {
		checkCalendarDate(oCalendarDate);
		return this.valueOf() > oCalendarDate.valueOf();
	}

	isSameOrBefore(oCalendarDate) {
		checkCalendarDate(oCalendarDate);
		return this.valueOf() <= oCalendarDate.valueOf();
	}

	isSameOrAfter(oCalendarDate) {
		checkCalendarDate(oCalendarDate);
		return this.valueOf() >= oCalendarDate.valueOf();
	}

	isSame(oCalendarDate) {
		checkCalendarDate(oCalendarDate);
		return this.valueOf() === oCalendarDate.valueOf();
	}

	toLocalJSDate() {
		// Use this._oUDate.getTime()(returns the same point of time regardless calendar type)  instead of
		// this._oUDate's getters to avoid non-gregorian Year, Month and Date to be used to construct a Gregorian date
		const oLocalDate = new Date(this._oUDate.getTime());

		// Make this date really local. Now getters are safe.
		oLocalDate.setFullYear(oLocalDate.getUTCFullYear(), oLocalDate.getUTCMonth(), oLocalDate.getUTCDate());
		oLocalDate.setHours(0, 0, 0, 0);

		return oLocalDate;
	}

	toUTCJSDate() {
		// Use this._oUDate.getTime()(returns the same point of time regardless calendar type)  instead of
		// this._oUDate's getters to avoid non-gregorian Year, Month and Date to be used to construct a Gregorian date
		const oUTCDate = new Date(this._oUDate.getTime());
		oUTCDate.setUTCHours(0, 0, 0, 0);

		return oUTCDate;
	}

	toString() {
		return `${this._oUDate.sCalendarType}: ${this.getYear()}/${this.getMonth() + 1}/${this.getDate()}`;
	}

	valueOf() {
		return this._oUDate.getTime();
	}

	static fromLocalJSDate(oJSDate, sCalendarType) {
		// Cross frame check for a date should be performed here otherwise setDateValue would fail in OPA tests
		// because Date object in the test is different than the Date object in the application (due to the iframe).
		// We can use jQuery.type or this method:
		function isValidDate(date) {
			return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date); // eslint-disable-line
		}
		if (!isValidDate(oJSDate)) {
			throw new Error(`Date parameter must be a JavaScript Date object: [${oJSDate}].`);
		}
		return new CalendarDate(oJSDate.getFullYear(), oJSDate.getMonth(), oJSDate.getDate(), sCalendarType);
	}

	static fromTimestamp(iTimestamp, sCalendarType) {
		const oCalDate = new CalendarDate(0, 0, 1);
		oCalDate._oUDate = UniversalDate.getInstance(new Date(iTimestamp), sCalendarType);
		return oCalDate;
	}
}

function createUniversalUTCDate(oDate, sCalendarType) {
	if (sCalendarType) {
		return UniversalDate.getInstance(createUTCDate(oDate), sCalendarType);
	}
	return new UniversalDate(createUTCDate(oDate).getTime());
}

/**
 * Creates a JavaScript UTC Date corresponding to the given JavaScript Date.
 * @param {Date} oDate JavaScript date object. Time related information is cut.
 * @returns {Date} JavaScript date created from the date object, but this time considered as UTC date information.
 */
function createUTCDate(oDate) {
	const oUTCDate = new Date(Date.UTC(0, 0, 1));

	oUTCDate.setUTCFullYear(oDate.getFullYear(), oDate.getMonth(), oDate.getDate());

	return oUTCDate;
}

function checkCalendarDate(oCalendarDate) {
	if (!(oCalendarDate instanceof CalendarDate)) {
		throw new Error(`Invalid calendar date: [${oCalendarDate}]. Expected: sap.ui.unified.calendar.CalendarDate`);
	}
}

/**
 * Verifies the given value is numeric like, i.e. 3, "3" and throws an error if it is not.
 * @param {any} value The value of any type to check. If null or undefined, this method throws an error.
 * @param {string} message The message to be used if an error is to be thrown
 * @throws will throw an error if the value is null or undefined or is not like a number
 */
function checkNumericLike(value, message) {
	if (value === undefined || value === Infinity || isNaN(value)) { // eslint-disable-line
		throw message;
	}
}

/**
 * Different states.
 */
const ValueStates = {
	None: "None",
	Success: "Success",
	Warning: "Warning",
	Error: "Error",
	Information: "Information",
};

class ValueState extends DataType {
	static isValid(value) {
		return !!ValueStates[value];
	}
}

ValueState.generataTypeAcessors(ValueStates);

const KeyCodes = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	BREAK: 19,
	CAPS_LOCK: 20,
	ESCAPE: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	ARROW_LEFT: 37,
	ARROW_UP: 38,
	ARROW_RIGHT: 39,
	ARROW_DOWN: 40,
	PRINT: 44,
	INSERT: 45,
	DELETE: 46,
	DIGIT_0: 48,
	DIGIT_1: 49,
	DIGIT_2: 50,
	DIGIT_3: 51,
	DIGIT_4: 52,
	DIGIT_5: 53,
	DIGIT_6: 54,
	DIGIT_7: 55,
	DIGIT_8: 56,
	DIGIT_9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	WINDOWS: 91,
	CONTEXT_MENU: 93,
	TURN_OFF: 94,
	SLEEP: 95,
	NUMPAD_0: 96,
	NUMPAD_1: 97,
	NUMPAD_2: 98,
	NUMPAD_3: 99,
	NUMPAD_4: 100,
	NUMPAD_5: 101,
	NUMPAD_6: 102,
	NUMPAD_7: 103,
	NUMPAD_8: 104,
	NUMPAD_9: 105,
	NUMPAD_ASTERISK: 106,
	NUMPAD_PLUS: 107,
	NUMPAD_MINUS: 109,
	NUMPAD_COMMA: 110,
	NUMPAD_SLASH: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	NUM_LOCK: 144,
	SCROLL_LOCK: 145,
	OPEN_BRACKET: 186,
	PLUS: 187,
	COMMA: 188,
	SLASH: 189,
	DOT: 190,
	PIPE: 191,
	SEMICOLON: 192,
	MINUS: 219,
	GREAT_ACCENT: 220,
	EQUALS: 221,
	SINGLE_QUOTE: 222,
	BACKSLASH: 226,
};

const isEnter = event => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);

const isSpace = event => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);

const isLeft = event => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event);

const isRight = event => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event);

const isUp = event => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event);

const isDown = event => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event);

const isHome = event => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && !hasModifierKeys(event);

const isEnd = event => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && !hasModifierKeys(event);

const isEscape = event => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event);

const isShow = event => {
	if (event.key) {
		return isF4(event) || isShowByArrows(event);
	}

	return (event.keyCode === KeyCodes.F4 && !hasModifierKeys(event)) || (event.keyCode === KeyCodes.ARROW_DOWN && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false));
};

const isF4 = event => {
	return event.key === "F4" && !hasModifierKeys(event);
};

const isShowByArrows = event => {
	return ((event.key === "ArrowDown" || event.key === "Down") || (event.key === "ArrowUp" || event.key === "Up")) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ true, /* Shift */ false);
};

const hasModifierKeys = event => event.shiftKey || event.altKey || getCtrlKey(event);

const getCtrlKey = event => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.

const checkModifierKeys = (event, bCtrlKey, bAltKey, bShiftKey) => event.shiftKey === bShiftKey && event.altKey === bAltKey && getCtrlKey(event) === bCtrlKey;

/**
 * Device and Feature Detection API: Provides information about the used browser / device and cross platform support for certain events
 * like media queries, orientation change or resizing.
 *
 * This API is independent from any other part of the UI5 framework. This allows it to be loaded beforehand, if it is needed, to create the UI5 bootstrap
 * dynamically depending on the capabilities of the browser or device.
 *
 * @namespace
 * @name Device
 */

const Device$1 = {};

//* ******* OS Detection ********

/**
 * Contains information about the operating system of the Device.
 * @name Device.os
 */

/**
 * Enumeration containing the names of known operating systems.
 * @name Device.os.OS
 */

/**
 * The name of the operating system.
 * @name Device.os.name
 * @type String
 */

/**
 * The version of the operating system as <code>string</code>. Might be empty if no version can be determined.
 * @name Device.os.versionStr
 * @type String
 */

/**
 * The version of the operating system as <code>float</code>. Might be <code>-1</code> if no version can be determined.
 * @name Device.os.version
 * @type float
 */

/**
 * If this flag is set to <code>true</code>, a Windows operating system is used.
 * @name Device.os.windows
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, a Mac operating system is used.
 * @name Device.os.macintosh
 * @type boolean
 */

/*
 * If this flag is set to <code>true</code>, an iOS operating system is used.
 * @name Device.os.ios
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, an Android operating system is used.
 * @name Device.os.android
 * @type boolean
 */

/*
 * Windows operating system name.
 * @see Device.os.name
 * @name Device.os.OS.WINDOWS
 */

/**
 * MAC operating system name.
 * @see Device.os.name
 * @name Device.os.OS.MACINTOSH
 */

/**
 * iOS operating system name.
 * @see Device.os.name
 * @name Device.os.OS.IOS
 */

/**
 * Android operating system name.
 * @see Device.os.name
 * @name Device.os.OS.ANDROID
 */

const OS = {
	"WINDOWS": "win",
	"MACINTOSH": "mac",
	"IOS": "iOS",
	"ANDROID": "Android",
};

const _getMobileOS = () => {
	const userAgent = navigator.userAgent;

	let rPlatform, // regular expression for platform
		aMatches;

	// iOS, Android
	rPlatform = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[)][^\d]*)([\d.]*)\s/;
	aMatches = userAgent.match(rPlatform);

	if (aMatches) {
		const rAppleDevices = /iPhone|iPad|iPod/;

		if (aMatches[0].match(rAppleDevices)) {
			aMatches[3] = aMatches[3].replace(/_/g, ".");

			return ({
				"name": OS.IOS,
				"versionStr": aMatches[3],
			});
		}

		if (aMatches[2].match(/Android/)) {
			aMatches[2] = aMatches[2].replace(/\s/g, "");
			return ({
				"name": OS.ANDROID,
				"versionStr": aMatches[3],
			});
		}
	}

	// Firefox on Android
	rPlatform = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
	aMatches = userAgent.match(rPlatform);
	if (aMatches) {
		return ({
			"name": OS.ANDROID,
			"versionStr": aMatches.length === 3 ? aMatches[2] : "",
		});
	}
};

const _getDesktopOS = () => {
	const sPlatform = navigator.platform;
	if (sPlatform.indexOf("Win") !== -1) {
		const rVersion = /Windows NT (\d+).(\d)/i; // userAgent since windows 10: Windows NT 10[...]
		const uaResult = navigator.userAgent.match(rVersion);

		return {
			"name": OS.WINDOWS,
			"versionStr": uaResult[1],
		};
	}

	if (sPlatform.indexOf("Mac") !== -1) {
		return {
			"name": OS.MACINTOSH,
			"versionStr": "",
		};
	}

	return null;
};

const _getOS = () => {
	return _getMobileOS() || _getDesktopOS();
};

const _setOS = () => {
	if (Device$1.os) {
		return;
	}

	Device$1.os = _getOS() || {};
	Device$1.os.OS = OS;
	Device$1.os.version = Device$1.os.versionStr ? parseFloat(Device$1.os.versionStr) : -1;

	if (Device$1.os.name) {
		Object.keys(OS).forEach(name => {
			if (OS[name] === Device$1.os.name) {
				Device$1.os[name.toLowerCase()] = true;
			}
		});
	}
};

//* ******* Browser Detection ********

/**
 * Contains information about the used browser.
 * @name Device.browser
 */

/**
 * Enumeration containing the names of known browsers.
 * @name Device.browser.BROWSER
 *
 * The name of the browser.
 * @name Device.browser.name
 * @type String
 */

/**
 * The version of the browser as <code>string</code>. Might be empty if no version can be determined.
 * @name Device.browser.versionStr
 * @type String
 */

/**
 * The version of the browser as <code>float</code>. Might be <code>-1</code> if no version can be determined.
 * @name Device.browser.version
 * @type float
 */

/**
 * If this flag is set to <code>true</code>, the mobile variant of the browser is used or
 * a tablet or phone device is detected. This information might not be available for all browsers.
 * @name Device.browser.mobile
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 * @name Device.browser.internet_explorer
 * @type boolean
 * @deprecated since 1.20, use {@link Device.browser.msie} instead.
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Internet Explorer browser is used.
 * @name Device.browser.msie
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Microsoft Edge browser is used.
 * @name Device.browser.edge
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Mozilla Firefox browser is used.
 * @name Device.browser.firefox
 */

/**
 * If this flag is set to <code>true</code>, the Google Chrome browser is used.
 * @name Device.browser.chrome
 * @type boolean
 *
 * If this flag is set to <code>true</code>, the Apple Safari browser is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the standalone (fullscreen) mode or webview is used on iOS devices.
 * Please also note the flags {@link Device.browser.fullscreen} and {@link Device.browser.webview}.
 *
 * @name Device.browser.safari
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Webkit engine is used.
 *
 * <b>Note:</b>
 * This flag is also <code>true</code> when the used browser was based on the Webkit engine, but
 * uses another rendering engine in the meantime. For example the Chrome browser started from version 28 and above
 * uses the Blink rendering engine.
 *
 * @name Device.browser.webkit
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Safari browser runs in standalone fullscreen mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link Device.browser.version}.
 *
 * @name Device.browser.fullscreen
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Safari browser runs in webview mode on iOS.
 *
 * <b>Note:</b> This flag is only available if the Safari browser was detected. Furthermore, if this mode is detected,
 * technically not a standard Safari is used. There might be slight differences in behavior and detection, e.g.
 * the availability of {@link Device.browser.version}.
 *
 * @name Device.browser.webview
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the Phantom JS browser is used.
 * @name Device.browser.phantomJS
 * @type boolean
 */

/**
 * The version of the used Webkit engine, if available.
 * @name Device.browser.webkitVersion
 * @type String
 */

/**
 * If this flag is set to <code>true</code>, a browser featuring a Mozilla engine is used.
 * @name Device.browser.mozilla
 * @type boolean
 */

/**
 * Internet Explorer browser name.
 * @name Device.browser.BROWSER.INTERNET_EXPLORER
 */

/**
 * Edge browser name.
 * @name Device.browser.BROWSER.EDGE
 */

/**
 * Firefox browser name.
 * @name Device.browser.BROWSER.FIREFOX
 */

/**
 * Chrome browser name.
 * @name Device.browser.BROWSER.CHROME
 */

/**
 * Safari browser name.
 * @name Device.browser.BROWSER.SAFARI
 */

/**
 * Android stock browser name.
 * @name Device.browser.BROWSER.ANDROID
 */

const BROWSER = {
	"INTERNET_EXPLORER": "ie",
	"EDGE": "ed",
	"FIREFOX": "ff",
	"CHROME": "cr",
	"SAFARI": "sf",
	"ANDROID": "an",
};

/*!
* Taken from jQuery JavaScript Library v1.7.1
* http://jquery.com/
*
* Copyright 2011, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Includes Sizzle.js
* http://sizzlejs.com/
* Copyright 2011, The Dojo Foundation
* Released under the MIT, BSD, and GPL Licenses.
*
* Date: Mon Nov 21 21:11:03 2011 -0500
*/
const _calcBrowser = () => {
	const sUserAgent = navigator.userAgent.toLowerCase();

	const rwebkit = /(webkit)[ /]([\w.]+)/;
	const rmsie = /(msie) ([\w.]+)/;
	const rmsie11 = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
	const redge = /(edge)[ /]([\w.]+)/;
	const rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

	// WinPhone IE11 and MS Edge userAgents contain "WebKit" and "Mozilla" and therefore must be checked first
	const browserMatch = redge.exec(sUserAgent)
		|| rmsie11.exec(sUserAgent)
		|| rwebkit.exec(sUserAgent)
		|| rmsie.exec(sUserAgent)
		|| (sUserAgent.indexOf("compatible") < 0 && rmozilla.exec(sUserAgent)) || [];

	const oRes = {
		browser: browserMatch[1] || "",
		version: browserMatch[2] || "0",
	};
	oRes[oRes.browser] = true;
	return oRes;
};

const _getBrowser = () => {
	const oBrowser = _calcBrowser();
	const sUserAgent = navigator.userAgent;
	const oNavigator = window.navigator;

	// jQuery checks for user agent strings. We differentiate between browsers
	let oExpMobile;
	let oResult;
	let fVersion;

	// Mozilla
	if (oBrowser.mozilla) {
		oExpMobile = /Mobile/;
		if (sUserAgent.match(/Firefox\/(\d+\.\d+)/)) {
			fVersion = parseFloat(RegExp.$1);
			oResult = {
				name: BROWSER.FIREFOX,
				versionStr: `${fVersion}`,
				version: fVersion,
				mozilla: true,
				mobile: oExpMobile.test(sUserAgent),
			};
		} else {
			// unknown mozilla browser
			oResult = {
				mobile: oExpMobile.test(sUserAgent),
				mozilla: true,
				version: -1,
			};
		}
	} else if (oBrowser.webkit) {
		// webkit version is needed for calculation if the mobile android device is a tablet (calculation of other mobile devices work without)
		const regExpWebkitVersion = sUserAgent.toLowerCase().match(/webkit[/]([\d.]+)/);
		let webkitVersion;
		if (regExpWebkitVersion) {
			webkitVersion = regExpWebkitVersion[1];
		}
		oExpMobile = /Mobile/;
		const aChromeMatch = sUserAgent.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);
		const aFirefoxMatch = sUserAgent.match(/FxiOS\/(\d+\.\d+)/);
		const aAndroidMatch = sUserAgent.match(/Android .+ Version\/(\d+\.\d+)/);

		if (aChromeMatch || aFirefoxMatch || aAndroidMatch) {
			let sName,
				sVersion,
				bMobile;

			if (aChromeMatch) {
				sName = BROWSER.CHROME;
				bMobile = oExpMobile.test(sUserAgent);
				sVersion = parseFloat(aChromeMatch[2]);
			} else if (aFirefoxMatch) {
				sName = BROWSER.FIREFOX;
				bMobile = true;
				sVersion = parseFloat(aFirefoxMatch[1]);
			} else if (aAndroidMatch) {
				sName = BROWSER.ANDROID;
				bMobile = oExpMobile.test(sUserAgent);
				sVersion = parseFloat(aAndroidMatch[1]);
			}

			oResult = {
				name: sName,
				mobile: bMobile,
				versionStr: `${sVersion}`,
				version: sVersion,
				webkit: true,
				webkitVersion,
			};
		} else { // Safari might have an issue with sUserAgent.match(...); thus changing
			const oExp = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
			const bStandalone = oNavigator.standalone;
			if (oExp.test(sUserAgent)) {
				const aParts = oExp.exec(sUserAgent);
				fVersion = parseFloat(aParts[2]);
				oResult = {
					name: BROWSER.SAFARI,
					versionStr: `${fVersion}`,
					fullscreen: false,
					webview: false,
					version: fVersion,
					mobile: oExpMobile.test(sUserAgent),
					webkit: true,
					webkitVersion,
					phantomJS: aParts[1] === "PhantomJS",
				};
			} else if (/iPhone|iPad|iPod/.test(sUserAgent) && !(/CriOS/.test(sUserAgent)) && !(/FxiOS/.test(sUserAgent)) && (bStandalone === true || bStandalone === false)) {
				// WebView or Standalone mode on iOS
				oResult = {
					name: BROWSER.SAFARI,
					version: -1,
					fullscreen: bStandalone,
					webview: !bStandalone,
					mobile: oExpMobile.test(sUserAgent),
					webkit: true,
					webkitVersion,
				};
			} else { // other webkit based browser
				oResult = {
					mobile: oExpMobile.test(sUserAgent),
					webkit: true,
					webkitVersion,
					version: -1,
				};
			}
		}
	} else if (oBrowser.msie || oBrowser.trident) {
		fVersion = parseFloat(oBrowser.version);

		oResult = {
			name: BROWSER.INTERNET_EXPLORER,
			versionStr: `${fVersion}`,
			version: fVersion,
			msie: true,
			mobile: false,
		};
	} else if (oBrowser.edge) {
		fVersion = parseFloat(oBrowser.version);
		oResult = {
			name: BROWSER.EDGE,
			versionStr: `${fVersion}`,
			version: fVersion,
			edge: true,
		};
	} else {
		oResult = {
			name: "",
			versionStr: "",
			version: -1,
			mobile: false,
		};
	}

	return oResult;
};

const _setBrowser = () => {
	Device$1.browser = _getBrowser();
	Device$1.browser.BROWSER = BROWSER;

	if (Device$1.browser.name) {
		Object.keys(BROWSER).forEach(b => {
			if (BROWSER[b] === Device$1.browser.name) {
				Device$1.browser[b.toLowerCase()] = true;
			}
		});
	}
};

const isIE = () => {
	if (!Device$1.browser) {
		_setBrowser();
	}
	return !!Device$1.browser.msie;
};

const isSafari = () => {
	if (!Device$1.browser) {
		_setBrowser();
	}
	return !!Device$1.browser.safari;
};

//* ******* Support Detection ********

const _setSupport = () => {
	if (Device$1.support) {
		return;
	}

	if (!Device$1.browser) {
		_setBrowser();
	}

	Device$1.support = {};
	Device$1.support.touch = !!(("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (window.DocumentTouch && document instanceof window.DocumentTouch));
};

const supportTouch = () => {
	if (!Device$1.support) {
		_setSupport();
	}

	return !!Device$1.support.touch;
};

//* ******* System Detection ********

/**
 * Provides a basic categorization of the used device based on various indicators.
 *
 * <b>Note:</b> Depending on the capabilities of the device it is also possible that multiple flags are set to <code>true</code>.
 *
 * @namespace
 * @name Device.system
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a tablet.
 *
 * <b>Note:</b> This flag is also true for some browsers on desktop devices running on Windows 8 or higher.
 * Also see the documentation for {@link Device.system.combi} devices.
 * You can use the following logic to ensure that the current device is a tablet device:
 *
 * <pre>
 * if(Device.system.tablet && !Device.system.desktop){
 *	...tablet related commands...
 * }
 * </pre>
 *
 * @name Device.system.tablet
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a phone.
 *
 * @name Device.system.phone
 * @type boolean
 */

/**
 * If this flag is set to <code>true</code>, the device is recognized as a desktop system.
 *
 * @name Device.system.desktop
 * @type boolean
 */

/**
 * Indicates if the device is recognized as a combination of a desktop system and tablet.
 *
 * <b>Note:</b> This property is mainly for Microsoft Windows 8 (and following) devices where the mouse and touch event may be supported
 * natively by the browser being used. This property is set to <code>true</code> only when both mouse and touch event are natively supported.
 *
 * @name Device.system.combi
 * @type boolean
 */

/**
 * @name Device.system.SYSTEMTYPE
 * Enumeration containing the names of known types of the devices.
 */

const SYSTEMTYPE = {
	"TABLET": "tablet",
	"PHONE": "phone",
	"DESKTOP": "desktop",
	"COMBI": "combi",
};

const _isTablet = () => {
	const sUserAgent = navigator.userAgent;
	if (Device$1.os.name === Device$1.os.OS.IOS) {
		return /ipad/i.test(sUserAgent);
	}
	// in real mobile device
	if (supportTouch()) {
		if (Device$1.os.windows && Device$1.os.version >= 8) {
			return true;
		}

		if (Device$1.browser.chrome && Device$1.os.android && Device$1.os.version >= 4.4) {
			// From Android version 4.4, WebView also uses Chrome as Kernel.
			// We can use the user agent pattern defined in Chrome to do phone/tablet detection
			// According to the information here: https://developer.chrome.com/multidevice/user-agent#chrome_for_android_user_agent,
			//  the existence of "Mobile" indicates it's a phone. But because the crosswalk framework which is used in Fiori Client
			//  inserts another "Mobile" to the user agent for both tablet and phone, we need to check whether "Mobile Safari/<Webkit Rev>" exists.
			return !/Mobile Safari\/[.0-9]+/.test(sUserAgent);
		}
		let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1; // may be undefined in Windows Phone devices
		// On Android sometimes window.screen.width returns the logical CSS pixels, sometimes the physical device pixels;
		// Tests on multiple devices suggest this depends on the Webkit version.
		// The Webkit patch which changed the behavior was done here: https://bugs.webkit.org/show_bug.cgi?id=106460
		// Chrome 27 with Webkit 537.36 returns the logical pixels,
		// Chrome 18 with Webkit 535.19 returns the physical pixels.
		// The BlackBerry 10 browser with Webkit 537.10+ returns the physical pixels.
		// So it appears like somewhere above Webkit 537.10 we do not hve to divide by the devicePixelRatio anymore.
		if (Device$1.os.android && Device$1.browser.webkit && (parseFloat(Device$1.browser.webkitVersion) > 537.10)) {
			densityFactor = 1;
		}

		// this is how android distinguishes between tablet and phone
		// http://android-developers.blogspot.de/2011/07/new-tools-for-managing-screen-sizes.html
		const bTablet = (Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600);

		// special workaround for Nexus 7 where the window.screen.width is 600px or 601px in portrait mode (=> tablet)
		// but window.screen.height 552px in landscape mode (=> phone), because the browser UI takes some space on top.
		// So the detected device type depends on the orientation :-(
		// actually this is a Chrome bug, as "width"/"height" should return the entire screen's dimensions and
		// "availWidth"/"availHeight" should return the size available after subtracting the browser UI

		/*
				if (isLandscape() &&
					(window.screen.height === 552 || window.screen.height === 553) // old/new Nexus 7
					&&
					(/Nexus 7/i.test(sUserAgent))) {
					bTablet = true;
				}
				*/

		return bTablet;
	}
	// This simple android phone detection can be used here because this is the mobile emulation mode in desktop browser
	const bAndroidPhone = (/(?=android)(?=.*mobile)/i.test(sUserAgent));
	// in desktop browser, it's detected as tablet when
	// 1. Windows 8 device with a touch screen where "Touch" is contained in the userAgent
	// 2. Android emulation and it's not an Android phone
	return (Device$1.browser.msie && sUserAgent.indexOf("Touch") !== -1) || (Device$1.os.android && !bAndroidPhone);
};

const _getSystem = () => {
	const bTabletDetected = _isTablet();
	const isWin8Upwards = Device$1.os.windows && Device$1.os.version >= 8;

	const oSystem = {};
	oSystem.tablet = !!((Device$1.support.touch || isWin8Upwards) && bTabletDetected);
	oSystem.phone = !!((Device$1.os.windows_phone || (Device$1.support.touch)) && !bTabletDetected);
	oSystem.desktop = !!((!oSystem.tablet && !oSystem.phone) || isWin8Upwards);
	oSystem.combi = oSystem.desktop && oSystem.tablet;
	oSystem.SYSTEMTYPE = SYSTEMTYPE;

	return oSystem;
};

const _setSystem = () => {
	_setSupport();
	_setOS();

	Device$1.system = {};
	Device$1.system = _getSystem();
	if (Device$1.system.tablet || Device$1.system.phone) {
		Device$1.browser.mobile = true;
	}
};

const isPhone = () => {
	if (!Device$1.system) {
		_setSystem();
	}

	return Device$1.system.phone;
};

const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;

/* Map for old language names for a few ISO639 codes. */
const M_ISO639_NEW_TO_OLD = {
	"he": "iw",
	"yi": "ji",
	"id": "in",
	"sr": "sh",
};

/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
 */
const normalizeLocale = locale => {
	let m;

	if (!locale) {
		return DEFAULT_LOCALE;
	}

	if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) {/* eslint-disable-line */
		let language = m[1].toLowerCase();
		let region = m[3] ? m[3].toUpperCase() : undefined;
		const script = m[2] ? m[2].toLowerCase() : undefined;
		const variants = m[4] ? m[4].slice(1) : undefined;
		const isPrivate = m[6];

		language = M_ISO639_NEW_TO_OLD[language] || language;

		// recognize and convert special SAP supportability locales (overwrites m[]!)
		if ((isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */ ||
			(variants && (m = SAPSupportabilityLocales.exec(variants)))) {/* eslint-disable-line */
			return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
		}

		// Chinese: when no region but a script is specified, use default region for each script
		if (language === "zh" && !region) {
			if (script === "hans") {
				region = "CN";
			} else if (script === "hant") {
				region = "TW";
			}
		}

		return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : ""); /* eslint-disable-line */
	}
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = locale => {
	if (!locale) {
		return DEFAULT_LOCALE;
	}

	if (locale === "zh_HK") {
		return "zh_TW";
	}

	// if there are multiple segments (separated by underscores), remove the last one
	const p = locale.lastIndexOf("_");
	if (p >= 0) {
		return locale.slice(0, p);
	}

	// for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)
	return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};

const bundleData = new Map();
const bundleURLs = new Map();

/**
 * Sets a map with texts and ID the are related to.
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} data an object with string locales as keys and text translataions as values
 * @public
 */
const setI18nBundleData = (packageName, data) => {
	bundleData.set(packageName, data);
};

const getI18nBundleData = packageName => {
	return bundleData.get(packageName);
};

/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async packageName => {
	const bundlesForPackage = bundleURLs.get(packageName);

	if (!bundlesForPackage) {
		console.warn(`Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */
		` You need to import ${packageName}/dist/Assets.js with a build tool that supports JSON imports.`); /* eslint-disable-line */
		return;
	}

	const language = getLocale().getLanguage();
	const region = getLocale().getRegion();

	let localeId = normalizeLocale(language + (region ? `-${region}` : ``));
	while (localeId !== DEFAULT_LANGUAGE && !bundlesForPackage[localeId]) {
		localeId = nextFallbackLocale(localeId);
	}

	if (!bundlesForPackage[localeId]) {
		setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
		return;
	}

	const bundleURL = bundlesForPackage[localeId];

	if (typeof bundleURL === "object") { // inlined from build
		setI18nBundleData(packageName, bundleURL);
		return;
	}

	const content = await fetchTextOnce(bundleURL);
	let parser;
	if (content.startsWith("{")) {
		parser = JSON.parse;
	} else {
		const PropertiesFormatSupport = getFeature("PropertiesFormatSupport");
		if (!PropertiesFormatSupport) {
			throw new Error(`In order to support .properties files, please: import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";`);
		}
		parser = PropertiesFormatSupport.parser;
	}

	const data = parser(content);

	setI18nBundleData(packageName, data);
};

// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange(() => {
	const allPackages = [...bundleData.keys()];
	return Promise.all(allPackages.map(fetchI18nBundle));
});

const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;

const formatMessage = (text, values) => {
	values = values || [];

	return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
		if ($1) {
			return '\''; /* eslint-disable-line */
		}

		if ($2) {
			return $2.replace(/''/g, '\''); /* eslint-disable-line */
		}

		if ($3) {
			return String(values[parseInt($3)]);
		}

		throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
	});
};

const I18nBundleInstances = new Map();

/**
 * @class
 * @public
 */
class I18nBundle {
	constructor(packageName) {
		this.packageName = packageName;
	}

	/**
	 * Returns a text in the currently loaded language
	 *
	 * @param {Object|String} textObj key/defaultText pair or just the key
	 * @param params Values for the placeholders
	 * @returns {*}
	 */
	getText(textObj, ...params) {
		if (typeof textObj === "string") {
			textObj = { key: textObj, defaultText: textObj };
		}

		if (!textObj || !textObj.key) {
			return "";
		}

		const bundle = getI18nBundleData(this.packageName);
		const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : (textObj.defaultText || textObj.key);

		return formatMessage(messageText, params);
	}
}

const getI18nBundle = packageName => {
	if (I18nBundleInstances.has(packageName)) {
		return I18nBundleInstances.get(packageName);
	}

	const i18nBundle = new I18nBundle(packageName);
	I18nBundleInstances.set(packageName, i18nBundle);
	return i18nBundle;
};

const getSharedResourcesInstance = () => getSingletonElementInstance("ui5-shared-resources", document.head);

/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "head" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */
const getSharedResource = (namespace, initialValue) => {
	const parts = namespace.split(".");
	let current = getSharedResourcesInstance();

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		const lastPart = i === parts.length - 1;
		if (!Object.prototype.hasOwnProperty.call(current, part)) {
			current[part] = lastPart ? initialValue : {};
		}
		current = current[part];
	}

	return current;
};

const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());

const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const DEFAULT_COLLECTION = "SAP-icons";

const calcKey = (name, collection) => {
	// silently support ui5-compatible URIs
	if (name.startsWith("sap-icon://")) {
		name = name.replace("sap-icon://", "");
		[name, collection] = name.split("/").reverse();
	}
	collection = collection || DEFAULT_COLLECTION;
	return `${collection}:${name}`;
};

const registerIcon = (name, { pathData, ltr, accData, collection } = {}) => { // eslint-disable-line
	const key = calcKey(name, collection);
	registry.set(key, { pathData, ltr, accData });
};

const getIconDataSync = (name, collection = DEFAULT_COLLECTION) => {
	const key = calcKey(name, collection);
	return registry.get(key);
};

const getIconData = async (name, collection = DEFAULT_COLLECTION) => {
	const key = calcKey(name, collection);

	if (!iconCollectionPromises.has(collection)) {
		iconCollectionPromises.set(collection, Promise.resolve(ICON_NOT_FOUND));
	}

	const iconData = await iconCollectionPromises.get(collection);

	if (iconData === ICON_NOT_FOUND) {
		return iconData;
	}

	return registry.get(key);
};

const name = "appointment-2";
const pathData = "M448 33q14 0 23 9t9 23v416q0 14-9 23t-23 9H64q-13 0-22.5-9T32 481V65q0-14 9.5-23T64 33h64V1h32v32h192V1h32v32h64zm-96 64h32V65h-32v32zm-224 0h32V65h-32v32zm320 32H64v352h384V129zM128 257q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm128 0q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm128 0q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm0 128q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm-128 0q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm-128 0q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9z";
const ltr = false;

registerIcon(name, { pathData, ltr});

const name$1 = "decline";
const pathData$1 = "M425.25 109q5 5 5 11.5t-5 11.5l-124 124 124 125q11 11 0 22l-22 23q-12 11-23 0l-125-125-124 125q-5 5-11.5 5t-11.5-5l-22-23q-5-5-5-11t5-11l124-125-124-124q-5-5-5-11.5t5-11.5l22-23q12-11 23 0l124 125 125-125q11-11 23 0l22 23z";
const ltr$1 = false;

registerIcon(name$1, { pathData: pathData$1, ltr: ltr$1});

const BUTTON_ARIA_TYPE_ACCEPT = {key: "BUTTON_ARIA_TYPE_ACCEPT", defaultText: "Positive Action"};const BUTTON_ARIA_TYPE_REJECT = {key: "BUTTON_ARIA_TYPE_REJECT", defaultText: "Negative Action"};const BUTTON_ARIA_TYPE_EMPHASIZED = {key: "BUTTON_ARIA_TYPE_EMPHASIZED", defaultText: "Emphasized"};const DATEPICKER_DATE_ACC_TEXT = {key: "DATEPICKER_DATE_ACC_TEXT", defaultText: "Date"};const DATEPICKER_OPEN_ICON_TITLE = {key: "DATEPICKER_OPEN_ICON_TITLE", defaultText: "Open Picker"};const INPUT_SUGGESTIONS = {key: "INPUT_SUGGESTIONS", defaultText: "Suggestions Available"};const INPUT_SUGGESTIONS_TITLE = {key: "INPUT_SUGGESTIONS_TITLE", defaultText: "Select"};const INPUT_SUGGESTIONS_ONE_HIT = {key: "INPUT_SUGGESTIONS_ONE_HIT", defaultText: "1 result available"};const INPUT_SUGGESTIONS_MORE_HITS = {key: "INPUT_SUGGESTIONS_MORE_HITS", defaultText: "{0} results are available"};const INPUT_SUGGESTIONS_NO_HIT = {key: "INPUT_SUGGESTIONS_NO_HIT", defaultText: "No results"};const VALUE_STATE_ERROR = {key: "VALUE_STATE_ERROR", defaultText: "Invalid entry"};const VALUE_STATE_WARNING = {key: "VALUE_STATE_WARNING", defaultText: "Warning issued"};const VALUE_STATE_INFORMATION = {key: "VALUE_STATE_INFORMATION", defaultText: "Informative entry"};const VALUE_STATE_SUCCESS = {key: "VALUE_STATE_SUCCESS", defaultText: "Entry successfully validated"};

/*
	lit-html directive that removes and attribute if it is undefined
*/
var ifDefined = directive(value => part => {
	if ((value === undefined) && part instanceof AttributePart) {
		if (value !== part.value) {
			const name = part.committer.name;
			part.committer.element.removeAttribute(name);
		}
	} else if (part.committer && part.committer.element && part.committer.element.getAttribute(part.committer.name) === value) {
		part.setValue(noChange);
	} else {
		part.setValue(value);
	}
});

const block0 = (context) => { return html`<svg class="ui5-icon-root" tabindex="${ifDefined(context.tabIndex)}" dir="${ifDefined(context._dir)}" viewBox="0 0 512 512" role="${ifDefined(context.role)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${ifDefined(context.accessibleNameText)}" xmlns="http://www.w3.org/2000/svg" @focusin=${context._onfocusin} @focusout=${context._onfocusout} @keydown=${context._onkeydown} @keyup=${context._onkeyup} @click=${context._onclick}>${blockSVG1(context)}</svg>`; };
const block1 = (context) => { return svg`<title id="${ifDefined(context._id)}-tooltip">${ifDefined(context.accessibleNameText)}</title>`; };

const blockSVG1 = (context) => {return svg`${ context.hasIconTooltip ? block1(context) : undefined }<g role="presentation"><path transform="translate(0, 512) scale(1, -1)" d="${ifDefined(context.pathData)}"/></g>`};

var defaultThemeBase = ":root{--sapBrandColor:#0a6ed1;--sapHighlightColor:#0854a0;--sapBaseColor:#fff;--sapShellColor:#354a5f;--sapBackgroundColor:#f7f7f7;--sapFontFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontLightFamily:\"72-Light\",\"72-Lightfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBoldFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:2.25rem;--sapFontHeader2Size:1.5rem;--sapFontHeader3Size:1.25rem;--sapFontHeader4Size:1.125rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapTextColor:#32363a;--sapLinkColor:#0a6ed1;--sapLink_Hover_Color:#0854a0;--sapLink_Active_Color:#0a6ed1;--sapLink_Visited_Color:#0a6ed1;--sapLink_InvertedColor:#d3e8fd;--sapLink_SubtleColor:#074888;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0854a0;--sapActiveColor:#0854a0;--sapHighlightTextColor:#fff;--sapTitleColor:#32363a;--sapNegativeColor:#b00;--sapCriticalColor:#e9730c;--sapPositiveColor:#107e3e;--sapInformativeColor:#0a6ed1;--sapNeutralColor:#6a6d70;--sapNegativeElementColor:#b00;--sapCriticalElementColor:#e9730c;--sapPositiveElementColor:#107e3e;--sapInformativeElementColor:#0a6ed1;--sapNeutralElementColor:#6a6d70;--sapNegativeTextColor:#b00;--sapPositiveTextColor:#107e3e;--sapCriticalTextColor:#e9730c;--sapInformativeTextColor:#053b70;--sapNeutralTextColor:#6a6d70;--sapNeutralBorderColor:#6a6d70;--sapErrorColor:#b00;--sapErrorBorderColor:#b00;--sapWarningColor:#e9730c;--sapWarningBorderColor:#e9730c;--sapSuccessColor:#107e3e;--sapSuccessBorderColor:#107e3e;--sapInformationColor:#0a6ed1;--sapInformationBorderColor:#0a6ed1;--sapErrorBackground:#ffebeb;--sapWarningBackground:#fef7f1;--sapSuccessBackground:#f1fdf6;--sapInformationBackground:#f5faff;--sapNeutralBackground:#f4f4f4;--sapIndicationColor_1:#800;--sapIndicationColor_1_Hover_Background:#6f0000;--sapIndicationColor_1_Active_Background:#500;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_2:#b00;--sapIndicationColor_2_Hover_Background:#a20000;--sapIndicationColor_2_Active_Background:#800;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_3:#e9730c;--sapIndicationColor_3_Hover_Background:#da6c0b;--sapIndicationColor_3_Active_Background:#cc650b;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_4:#107e3e;--sapIndicationColor_4_Hover_Background:#0d6733;--sapIndicationColor_4_Active_Background:#0a5128;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_5:#0a6ed1;--sapIndicationColor_5_Hover_Background:#0961b9;--sapIndicationColor_5_Active_Background:#0854a0;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_6:#0f828f;--sapIndicationColor_6_Hover_Background:#0d6d78;--sapIndicationColor_6_Active_Background:#0a5861;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_7:#925ace;--sapIndicationColor_7_Hover_Background:#8546c8;--sapIndicationColor_7_Active_Background:#7838bd;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_8:#c0399f;--sapIndicationColor_8_Hover_Background:#ac338f;--sapIndicationColor_8_Active_Background:#992d7e;--sapIndicationColor_8_TextColor:#fff;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.25rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.4;--sapContent_IconHeight:1rem;--sapContent_IconColor:#0854a0;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#6a6d70;--sapContent_MarkerIconColor:#286eb4;--sapContent_MarkerTextColor:#0e7581;--sapContent_ImagePlaceholderBackground:#ccc;--sapContent_ImagePlaceholderForegroundColor:#fff;--sapContent_RatedColor:#d08014;--sapContent_UnratedColor:#89919a;--sapContent_FocusColor:#000;--sapContent_FocusStyle:dotted;--sapContent_FocusWidth:.0625rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0 0.0625rem rgba(0,0,0,0.1),0 0.125rem 0.5rem 0 rgba(0,0,0,0.1);--sapContent_Shadow1:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.125rem 0.5rem 0 rgba(0,0,0,0.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.625rem 1.875rem 0 rgba(0,0,0,0.3);--sapContent_Shadow3:0 0 0 0.0625rem rgba(0,0,0,0.42),0 1.25rem 5rem 0 rgba(0,0,0,0.3);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_HeaderShadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_SearchHighlightColor:#d4f7db;--sapContent_HelpColor:#3f8600;--sapContent_LabelColor:#6a6d70;--sapContent_MonospaceFontFamily:lucida console,monospace;--sapContent_DisabledTextColor:rgba(50,54,58,0.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#89919a;--sapContent_ForegroundTextColor:#32363a;--sapContent_BadgeBackground:#d04343;--sapContent_BadgeTextColor:#fff;--sapContent_Placeholderloading_Background:#e0e0e0;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#e0e0e0 0%,#e0e0e0 35%,#d3d3d3 50%,#e0e0e0 65%,#e0e0e0);--sapContent_DragAndDropActiveColor:#0854a0;--sapContent_Selected_Background:#0854a0;--sapContent_Selected_TextColor:#fff;--sapContent_Selected_Hover_Background:#095caf;--sapContent_Illustrative_Color1:#0a6ed1;--sapContent_Illustrative_Color2:#72b5f8;--sapContent_Illustrative_Color3:#ffba10;--sapContent_Illustrative_Color4:#4a5055;--sapContent_Illustrative_Color5:#9da4aa;--sapContent_Illustrative_Color6:#c6cace;--sapContent_Illustrative_Color7:#e7e9ea;--sapContent_Illustrative_Color8:#fff;--sapShell_Background:#edeff0;--sapShell_BackgroundImage:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundGradient:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#354a5f;--sapShell_TextColor:#fff;--sapShell_InteractiveTextColor:#d1e8ff;--sapShell_InteractiveBorderColor:#7996b4;--sapShell_GroupTitleTextColor:#32363a;--sapShell_Hover_Background:#283848;--sapShell_Active_Background:#23303e;--sapShell_Active_TextColor:#fff;--sapShell_Selected_Background:#23303e;--sapShell_Selected_TextColor:#fff;--sapShell_Selected_Hover_Background:#23303e;--sapShell_Favicon:none;--sapShell_Navigation_Background:#fff;--sapShell_Navigation_SelectedColor:#0854a0;--sapShell_Navigation_Selected_TextColor:#0854a0;--sapShell_Navigation_TextColor:#32363a;--sapShell_Shadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 rgba(0,0,0,0.2);--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.25rem;--sapButton_Background:#fff;--sapButton_BorderColor:#0854a0;--sapButton_TextColor:#0854a0;--sapButton_Hover_Background:#ebf5fe;--sapButton_Hover_BorderColor:#0854a0;--sapButton_Hover_TextColor:#0854a0;--sapButton_IconColor:#0854a0;--sapButton_Active_Background:#0854a0;--sapButton_Active_BorderColor:#0854a0;--sapButton_Active_TextColor:#fff;--sapButton_Emphasized_Background:#0a6ed1;--sapButton_Emphasized_BorderColor:#0a6ed1;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#085caf;--sapButton_Emphasized_Hover_BorderColor:#085caf;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#0854a0;--sapButton_Emphasized_Active_BorderColor:#0854a0;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Accept_Background:#fff;--sapButton_Accept_BorderColor:#107e3e;--sapButton_Accept_Hover_Background:#f1fdf6;--sapButton_Accept_Hover_BorderColor:#107e3e;--sapButton_Accept_Hover_TextColor:#107e3e;--sapButton_Accept_Active_Background:#0d6733;--sapButton_Accept_Active_BorderColor:#0d6733;--sapButton_Accept_TextColor:#107e3e;--sapButton_Accept_Selected_Background:#0d6733;--sapButton_Accept_Selected_BorderColor:#0d6733;--sapButton_Accept_Selected_TextColor:#fff;--sapButton_Accept_Selected_Hover_Background:#107e3e;--sapButton_Accept_Selected_Hover_BorderColor:#107e3e;--sapButton_Reject_Background:#fff;--sapButton_Reject_BorderColor:#b00;--sapButton_Reject_Hover_Background:#ffebeb;--sapButton_Reject_Hover_BorderColor:#b00;--sapButton_Reject_Hover_TextColor:#b00;--sapButton_Reject_Active_Background:#a20000;--sapButton_Reject_Active_BorderColor:#a20000;--sapButton_Reject_TextColor:#b00;--sapButton_Reject_Selected_Background:#a20000;--sapButton_Reject_Selected_BorderColor:#a20000;--sapButton_Reject_Selected_TextColor:#fff;--sapButton_Reject_Selected_Hover_Background:#b00;--sapButton_Reject_Selected_Hover_BorderColor:#b00;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0854a0;--sapButton_Lite_Hover_Background:#ebf5fe;--sapButton_Lite_Hover_BorderColor:#0854a0;--sapButton_Lite_Hover_TextColor:#0854a0;--sapButton_Lite_Active_Background:#0854a0;--sapButton_Lite_Active_BorderColor:#0854a0;--sapButton_Selected_Background:#0854a0;--sapButton_Selected_BorderColor:#0854a0;--sapButton_Selected_TextColor:#fff;--sapButton_Selected_Hover_Background:#095caf;--sapButton_Selected_Hover_BorderColor:#095caf;--sapButton_Attention_Background:#fff;--sapButton_Attention_BorderColor:#e9730c;--sapButton_Attention_TextColor:#e9730c;--sapButton_Attention_Hover_Background:#fef7f1;--sapButton_Attention_Hover_BorderColor:#e9730c;--sapButton_Attention_Hover_TextColor:#e9730c;--sapButton_Attention_Active_Background:#d1670b;--sapButton_Attention_Active_BorderColor:#d1670b;--sapButton_Attention_Selected_Background:#d1670b;--sapButton_Attention_Selected_BorderColor:#d1670b;--sapButton_Attention_Selected_TextColor:#fff;--sapButton_Attention_Selected_Hover_Background:#e9730c;--sapButton_Attention_Selected_Hover_BorderColor:#e9730c;--sapButton_Negative_Background:#b00;--sapButton_Negative_BorderColor:#b00;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#970000;--sapButton_Negative_Hover_BorderColor:#970000;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#800;--sapButton_Negative_Active_BorderColor:#800;--sapButton_Critical_Background:#e9730c;--sapButton_Critical_BorderColor:#e9730c;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#c7620a;--sapButton_Critical_Hover_BorderColor:#c7620a;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#b85b0a;--sapButton_Critical_Active_BorderColor:#b85b0a;--sapButton_Success_Background:#107e3e;--sapButton_Success_BorderColor:#107e3e;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#0c5e2e;--sapButton_Success_Hover_BorderColor:#0c5e2e;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#0a5128;--sapButton_Success_Active_BorderColor:#0a5128;--sapButton_Information_Background:#0a6ed1;--sapButton_Information_BorderColor:#0a6ed1;--sapButton_Information_TextColor:#fff;--sapButton_Information_Hover_Background:#0961b9;--sapButton_Information_Hover_BorderColor:#0961b9;--sapButton_Information_Hover_TextColor:#fff;--sapButton_Information_Active_Background:#0854a0;--sapButton_Information_Active_BorderColor:#0854a0;--sapButton_Neutral_Background:#6a6d70;--sapButton_Neutral_BorderColor:#6a6d70;--sapButton_Neutral_TextColor:#fff;--sapButton_Neutral_Hover_Background:#595b5e;--sapButton_Neutral_Hover_BorderColor:#595b5e;--sapButton_Neutral_Hover_TextColor:#fff;--sapButton_Neutral_Active_Background:#515456;--sapButton_Neutral_Active_BorderColor:#515456;--sapButton_Track_Selected_Background:#ebf5fe;--sapButton_Track_Selected_TextColor:#32363a;--sapButton_Track_Background:#ededed;--sapButton_Track_TextColor:#32363a;--sapButton_TokenBackground:#fafafa;--sapButton_TokenBorderColor:#c2c2c2;--sapField_Background:#fff;--sapField_TextColor:#32363a;--sapField_PlaceholderTextColor:#74777a;--sapField_BorderColor:#89919a;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderCornerRadius:.125rem;--sapField_Hover_Background:#fff;--sapField_Hover_BorderColor:#0854a0;--sapField_Hover_HelpBackground:#ebf5fe;--sapField_Active_BorderColor:#0854a0;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#89919a;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:hsla(0,0%,94.9%,0.5);--sapField_ReadOnly_BorderColor:#89919a;--sapField_ReadOnly_HelpBackground:hsla(0,0%,94.9%,0.5);--sapField_RequiredColor:#ce3b3b;--sapField_InvalidColor:#b00;--sapField_InvalidBackground:#fff;--sapField_WarningColor:#e9730c;--sapField_WarningBackground:#fff;--sapField_SuccessColor:#107e3e;--sapField_SuccessBackground:#fff;--sapField_InformationColor:#0a6ed1;--sapField_InformationBackground:#fff;--sapGroup_TitleBackground:transparent;--sapGroup_TitleBorderColor:#d9d9d9;--sapGroup_TitleTextColor:#32363a;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:0;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:transparent;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#f2f2f2;--sapList_HeaderBorderColor:#e4e4e4;--sapList_HeaderTextColor:#32363a;--sapList_BorderColor:#e4e4e4;--sapList_TextColor:#32363a;--sapList_Active_TextColor:#fff;--sapList_BorderWidth:.0625rem;--sapList_SelectionBackgroundColor:#e5f0fa;--sapList_SelectionBorderColor:#0854a0;--sapList_Hover_SelectionBackground:#d8e9f8;--sapList_Background:#fff;--sapList_Hover_Background:#f5f5f5;--sapList_AlternatingBackground:#fafafa;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#d8d8d8;--sapList_GroupHeaderTextColor:#32363a;--sapList_FooterBackground:#fafafa;--sapList_FooterTextColor:#32363a;--sapList_TableGroupHeaderBackground:#efefef;--sapList_TableGroupHeaderBorderColor:#d8d8d8;--sapList_TableGroupHeaderTextColor:#32363a;--sapList_TableFooterBorder:#d8d8d8;--sapList_TableFixedBorderColor:#d8d8d8;--sapList_Active_Background:#0854a0;--sapScrollBar_FaceColor:#949494;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#949494;--sapScrollBar_SymbolColor:#0854a0;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#8c8c8c;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#32363a;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#32363a;--sapInfobar_Background:#0f828f;--sapInfobar_Hover_Background:#0e7581;--sapInfobar_Active_Background:#0a545c;--sapObjectHeader_Background:#fff;--sapObjectHeader_BorderColor:#d9d9d9;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#f5f5f5;--sapTile_Active_Background:#f5f5f5;--sapTile_BorderColor:transparent;--sapTile_TitleTextColor:#32363a;--sapTile_TextColor:#6a6d70;--sapTile_IconColor:#5a7da0;--sapTile_SeparatorColor:#ccc;--sapAccentColor1:#d08014;--sapAccentColor2:#d04343;--sapAccentColor3:#db1f77;--sapAccentColor4:#c0399f;--sapAccentColor5:#6367de;--sapAccentColor6:#286eb4;--sapAccentColor7:#0f828f;--sapAccentColor8:#7ca10c;--sapAccentColor9:#925ace;--sapAccentColor10:#647987;--sapLegend_WorkingBackground:#fafafa;--sapLegend_NonWorkingBackground:#dedede;--sapLegend_CurrentDateTime:#c0399f;--sapLegendColor1:#d58215;--sapLegendColor2:#dc5b5b;--sapLegendColor3:#db1f77;--sapLegendColor4:#9b3b3b;--sapLegendColor5:#cf5db3;--sapLegendColor6:#286eb4;--sapLegendColor7:#1193a2;--sapLegendColor8:#8b9668;--sapLegendColor9:#647987;--sapLegendColor10:#892971;--sapLegendColor11:#725a3a;--sapLegendColor12:#bb2f2f;--sapLegendColor13:#bc1b66;--sapLegendColor14:#8b714f;--sapLegendColor15:#606190;--sapLegendColor16:#597da1;--sapLegendColor17:#49797e;--sapLegendColor18:#687a33;--sapLegendColor19:#295989;--sapLegendColor20:#5154bd;--sapLegendBackgroundColor1:#fdf3e7;--sapLegendBackgroundColor2:#faeaea;--sapLegendBackgroundColor3:#fce9f2;--sapLegendBackgroundColor4:#f8ecec;--sapLegendBackgroundColor5:#f9ebf5;--sapLegendBackgroundColor6:#ebf3fa;--sapLegendBackgroundColor7:#e8fbfd;--sapLegendBackgroundColor8:#f3f4ef;--sapLegendBackgroundColor9:#f1f3f4;--sapLegendBackgroundColor10:#f9ebf6;--sapLegendBackgroundColor11:#f6f2ed;--sapLegendBackgroundColor12:#faeaea;--sapLegendBackgroundColor13:#fce9f2;--sapLegendBackgroundColor14:#f5f2ee;--sapLegendBackgroundColor15:#f0f0f5;--sapLegendBackgroundColor16:#eff2f6;--sapLegendBackgroundColor17:#eff5f6;--sapLegendBackgroundColor18:#f5f7ed;--sapLegendBackgroundColor19:#ebf2f9;--sapLegendBackgroundColor20:#ecedf8;--sapChart_OrderedColor_1:#5899da;--sapChart_OrderedColor_2:#e8743b;--sapChart_OrderedColor_3:#19a979;--sapChart_OrderedColor_4:#ed4a7b;--sapChart_OrderedColor_5:#945ecf;--sapChart_OrderedColor_6:#13a4b4;--sapChart_OrderedColor_7:#525df4;--sapChart_OrderedColor_8:#bf399e;--sapChart_OrderedColor_9:#6c8893;--sapChart_OrderedColor_10:#ee6868;--sapChart_OrderedColor_11:#2f6497;--sapChart_Bad:#dc0d0e;--sapChart_Critical:#de890d;--sapChart_Good:#3fa45b;--sapChart_Neutral:#848f94;--sapChart_Sequence_1:#5899da;--sapChart_Sequence_2:#e8743b;--sapChart_Sequence_3:#19a979;--sapChart_Sequence_4:#ed4a7b;--sapChart_Sequence_5:#945ecf;--sapChart_Sequence_6:#13a4b4;--sapChart_Sequence_7:#525df4;--sapChart_Sequence_8:#bf399e;--sapChart_Sequence_9:#6c8893;--sapChart_Sequence_10:#ee6868;--sapChart_Sequence_11:#2f6497;--sapChart_Sequence_Neutral:#848f94;}";

var defaultTheme = ":root{--_ui5_calendar_header_height:3rem;--_ui5_calendar_header_arrow_button_width:2.5rem;--_ui5_calendar_header_padding:0.25rem 0;--_ui5_checkbox_root_side_padding:.6875rem;--_ui5_checkbox_icon_size:1rem;--_ui5_custom_list_item_height:3rem;--_ui5_custom_list_item_rb_min_width:3rem;--_ui5_day_picker_item_width:2.25rem;--_ui5_day_picker_item_height:2.875rem;--_ui5_day_picker_empty_height:3rem;--_ui5_datetime_picker_width:40.0625rem;--_ui5_datetime_picker_height:25rem;--_ui5_datetime_timeview_phonemode_width:19.5rem;--_ui5_datetime_timeview_padding:1rem;--_ui5_input_inner_padding:0 0.75rem;--_ui5_input_value_state_icon_padding:var(--_ui5-input-icon-padding);--_ui5_list_no_data_height:3rem;--_ui5_list_item_cb_margin_right:0;--_ui5_list_item_title_size:var(--sapMFontLargeSize);--_ui5_list_item_img_size:2rem;--_ui5_list_item_img_margin:0.5rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:3rem;--_ui5_list_busy_row_height:3rem;--_ui5_month_picker_item_height:3rem;--_ui5_year_picker_item_height:3rem;--_ui5_tokenizer_root_padding:0.1875rem;--_ui5_token_height:1.625rem;--_ui5_token_icon_size:1rem;--_ui5_token_icon_padding:0.25rem 0.5rem;--_ui5_token_wrapper_right_padding:0.3125rem;--_ui5_tl_bubble_padding:1rem;--_ui5_tl_indicator_before_bottom:-1.625rem;--_ui5_tl_padding:1rem 1rem 1rem .5rem;--_ui5_tl_li_margin_bottom:1.625rem;--_ui5_rb_height:2.75rem;--_ui5_rb_label_side_padding:.875rem;--_ui5_rb_focus_dist:.5rem;--_ui5_rb_inner_size:2.75rem;--_ui5_rb_svg_size:1.375rem;--_ui5_rb_label_width:calc(100% - 2.75rem);--_ui5_rb_rtl_focus_right:0.5rem;--_ui5_switch_text_on_left:calc(-100% + 1.9125rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.875rem);--_ui5_switch_rtl_transform:translateX(1.875rem) translateX(-100%);--_ui5_switch_text_right:calc(-100% + 1.9125rem);--_ui5_tc_item_text:3rem;--_ui5_tc_item_text_text_only:3rem;--_ui5_tc_item_text_line_height:normal;--_ui5_tc_item_icon_size:1.5rem;--_ui5_tc_item_add_text_margin_top:0.625rem;--_ui5_textarea_padding:0.5625rem 0.6875rem;--_ui5-responnsive_popover_header_height:2.75rem;--ui5_side_navigation_item_height:2.75rem;--_ui5-tree-indent-step:1.5rem;--_ui5-tree-toggle-box-width:2.75rem;--_ui5-tree-toggle-box-height:2.25rem;--_ui5-tree-toggle-icon-size:1.0625rem;--_ui5_segmented_btn_border_radius:0.375rem;--ui5-avatar-initials-color:var(--sapContent_ImagePlaceholderForegroundColor);--ui5-avatar-initials-border:none;--ui5-avatar-accent1:var(--sapAccentColor1);--ui5-avatar-accent2:var(--sapAccentColor2);--ui5-avatar-accent3:var(--sapAccentColor3);--ui5-avatar-accent4:var(--sapAccentColor4);--ui5-avatar-accent5:var(--sapAccentColor5);--ui5-avatar-accent6:var(--sapAccentColor6);--ui5-avatar-accent7:var(--sapAccentColor7);--ui5-avatar-accent8:var(--sapAccentColor8);--ui5-avatar-accent9:var(--sapAccentColor9);--ui5-avatar-accent10:var(--sapAccentColor10);--ui5-avatar-placeholder:var(--sapContent_ImagePlaceholderBackground);--ui5-badge-font-size:0.75em;--_ui5_button_base_min_compact_width:2rem;--_ui5_button_compact_height:1.625rem;--_ui5_button_compact_padding:0.4375rem;--_ui5_button_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_outline_offset:-0.1875rem;--_ui5_button_focus_offset:1px;--_ui5_button_focus_width:1px;--_ui5_button_focus_color:var(--sapContent_FocusColor);--_ui5_button_transparent_border_color:transparent;--_ui5_button_transparent_hover_border_color:var(--sapButton_BorderColor);--_ui5_button_active_border_color:var(--sapButton_Active_BorderColor);--_ui5_button_positive_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_positive_border_hover_color:var(--sapButton_Accept_Hover_BorderColor);--_ui5_button_positive_border_active_color:var(--sapButton_Accept_Active_BorderColor);--_ui5_button_positive_border_focus_hover_color:var(--sapContent_FocusColor);--_ui5_button_positive_focus_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_negative_focus_border_color:var(--sapButton_Reject_BorderColor);--_ui5_button_negative_active_border_color:var(--sapButton_Reject_Active_BorderColor);--_ui5_button_emphasized_focused_border_color:var(--sapButton_Emphasized_BorderColor);--_ui5_button_base_min_width:2.25rem;--_ui5_button_base_height:2.25rem;--_ui5_button_border_radius:0.25rem;--_ui5_button_base_padding:0.5625rem;--_ui5_button_base_icon_only_padding:0.5625rem;--_ui5_button_base_icon_margin:0.375rem;--_ui5_button_emphasized_font_weight:bold;--_ui5_button_text_shadow:none;--_ui5_card_border_color:var(--sapTile_SeparatorColor);--_ui5_card_content_padding:1rem;--_ui5_card_header_hover_bg:var(--sapList_Hover_Background);--_ui5_card_header_active_bg:var(--_ui5_card_header_hover_bg);--_ui5_card_header_border_color:var(--_ui5_card_border_color);--_ui5_card_header_focus_border:1px dotted var(--sapContent_FocusColor);--ui5_carousel_button_size:2.5rem;--ui5_carousel_height:0.25rem;--ui5_carousel_width:0.25rem;--ui5_carousel_margin:0 0.375rem;--ui5_carousel_border:1px solid var(--sapContent_ForegroundBorderColor);--ui5_carousel_dot_border:none;--ui5_carousel_dot_background:var(--sapContent_NonInteractiveIconColor);--_ui5_checkbox_hover_background:var(--sapField_Hover_Background);--_ui5_checkbox_inner_width_height:1.375rem;--_ui5_checkbox_inner_error_border:0.125rem solid var(--sapField_InvalidColor);--_ui5_checkbox_inner_warning_border:0.125rem solid var(--sapField_WarningColor);--_ui5_checkbox_inner_information_border:0.125rem solid var(--sapField_InformationColor);--_ui5_checkbox_checkmark_warning_color:var(--sapField_TextColor);--_ui5_checkbox_checkmark_color:var(--sapSelectedColor);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:.5625rem;--_ui5_checkbox_focus_outline:1px dotted var(--sapContent_FocusColor);--_ui5_checkbox_compact_wrapper_padding:.5rem;--_ui5_checkbox_compact_width_height:2rem;--_ui5_checkbox_compact_inner_size:1rem;--_ui5_checkbox_compact_focus_position:.375rem;--_ui5_checkbox_wrapper_padding:.6875rem;--_ui5_checkbox_width_height:2.75rem;--_ui5_checkbox_inner_border:.0625rem solid var(--sapField_BorderColor);--_ui5_checkbox_focus_position:0.5625rem;--_ui5_checkbox_inner_border_radius:.125rem;--_ui5_checkbox_wrapped_content_margin_top:0;--_ui5_checkbox_wrapped_focus_padding:.5rem;--_ui5_checkbox_inner_readonly_border:1px solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_compact_wrapped_label_margin_top:-0.125rem;--_ui5_datepicker_icon_border:none;--_ui5_daypicker_item_margin:2px;--_ui5_daypicker_item_border:none;--_ui5_daypicker_item_outline_width:1px;--_ui5_daypicker_item_outline_offset:1px;--_ui5_daypicker_daynames_container_height:2rem;--_ui5_daypicker_item_othermonth_background_color:var(--sapList_Background);--_ui5_daypicker_item_othermonth_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_othermonth_hover_color:var(--sapContent_LabelColor);--_ui5_daypicker_dayname_color:var(--sapContent_LabelColor);--_ui5_daypicker_weekname_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_now_selected_focus_after_width:calc(100% - 0.125rem);--_ui5_daypicker_item_now_selected_focus_after_height:calc(100% - 0.125rem);--_ui5_daypicker_item_selected_hover_background_color:var(--sapActiveColor_Lighten3);--_ui5_daypicker_item_border_radius:0.25rem;--_ui5_daypicker_item_now_inner_border_radius:0.125rem;--ui5-group-header-listitem-background-color:var(--sapList_GroupHeaderBackground);--_ui5_input_width:13.125rem;--_ui5_input_compact_height:1.625rem;--_ui5_input_state_border_width:0.125rem;--_ui5-input-information_border_width:0.125rem;--_ui5_input_error_font_weight:normal;--_ui5_input_focus_border_width:1px;--_ui5_input_error_warning_border_style:solid;--_ui5_input_error_warning_font_style:inherit;--_ui5_input_disabled_color:var(--sapContent_DisabledTextColor);--_ui5_input_disabled_font_weight:normal;--_ui5_input_disabled_border_color:var(--sapField_BorderColor);--_ui5_input_disabled_background:var(--sapField_Background);--_ui5_input_icon_min_width:2.375rem;--_ui5_input_compact_min_width:2rem;--_ui5_input_height:2.25rem;--_ui5_input_disabled_opacity:0.4;--_ui5_input_wrapper_border_radius:0.125rem;--_ui5_input_icon_padding:.5625rem .6875rem;--_ui5_link_opacity:0.4;--_ui5_link_text_decoration:none;--_ui5_link_hover_text_decoration:underline;--ui5_list_footer_text_color:var(--sapTextColor);--ui5-listitem-background-color:var(--sapList_Background);--ui5-listitem-border-bottom:1px solid var(--sapList_BorderColor);--ui5-listitem-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--_ui5_listitembase_focus_width:1px;--_ui5_product_switch_item_border:none;--_ui5_monthpicker_item_border:none;--_ui5_monthpicker_item_margin:1px;--_ui5_monthpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_monthpicker_item_focus_after_offset:2px;--_ui5_monthpicker_item_border_radius:0.25rem;--_ui5_messagestrip_icon_width:2.5rem;--_ui5_messagestrip_border_radius:0.1875rem;--_ui5_messagestrip_button_border_width:0;--_ui5_messagestrip_button_border_style:none;--_ui5_messagestrip_button_border_color:transparent;--_ui5_messagestrip_button_border_radius:0;--_ui5_messagestrip_padding:0.125rem .125rem;--_ui5_messagestrip_button_height:1.625rem;--_ui5_messagestrip_border_width:1px;--_ui5_messagestrip_close_button_border:none;--_ui5_messagestrip_close_button_size:1.625rem;--_ui5_messagestrip_icon_top:0.4375rem;--_ui5_messagestrip_focus_width:1px;--_ui5_messagestrip_focus_offset:-2px;--_ui5_panel_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_panel_header_height:2.75rem;--_ui5_panel_button_root_width:2.75rem;--_ui5_popup_content_padding:.4375em;--_ui5_progress_indicator_value_state_none:var(--sapNeutralElementColor);--_ui5_progress_indicator_value_state_error:var(--sapNegativeElementColor);--_ui5_progress_indicator_value_state_warning:var(--sapCriticalElementColor);--_ui5_progress_indicator_value_state_success:var(--sapPositiveElementColor);--_ui5_progress_indicator_value_state_information:var(--sapInformativeElementColor);--_ui5_progress_indicator_color:var(--sapTextColor);--_ui5_progress_indicator_bar_color:var(--sapContent_ContrastTextColor);--_ui5_progress_indicator_border:0.0625rem solid var(--sapField_BorderColor);--_ui5_progress_indicator_bar_border_max:none;--_ui5_progress_indicator_icon_visibility:none;--_ui5_radiobutton_min_width:2.75rem;--_ui5_radiobutton_min_width_compact:2rem;--_ui5_radiobutton_hover_fill:var(--sapField_Hover_Background);--_ui5_radiobutton_border_width:1px;--_ui5_radiobutton_selected_fill:var(--sapSelectedColor);--_ui5_radiobutton_selected_error_fill:var(--sapField_InvalidColor);--_ui5_radiobutton_selected_warning_fill:var(--sapField_TextColor);--_ui5_radiobutton_warning_error_border_dash:0;--_ui5_select_disabled_background:var(--sapField_Background);--_ui5_select_disabled_border_color:var(--sapField_BorderColor);--_ui5_select_state_error_warning_border_style:solid;--_ui5_select_state_error_warning_border_width:0.125rem;--_ui5_select_hover_icon_left_border:1px solid transparent;--_ui5_select_rtl_hover_icon_left_border:none;--_ui5_select_rtl_hover_icon_right_border:none;--_ui5_select_focus_width:1px;--_ui5_switch_height:2.75rem;--_ui5_switch_width:3.875rem;--_ui5_switch_no_label_width:3.25rem;--_ui5_switch_outline:1px;--_ui5_switch_compact_height:2rem;--_ui5_switch_compact_width:3.5rem;--_ui5_switch_compact_no_label_width:2.5rem;--_ui5_switch_track_height:1.375rem;--_ui5_switch_track_no_label_height:1.25rem;--_ui5_switch_track_compact_no_label_height:1rem;--_ui5_switch_track_hover_border_color:var(--_ui5_switch_track_checked_border_color);--_ui5_switch_track_hover_background_color:var(--sapButton_Track_Background);--_ui5_switch_track_hover_checked_background_color:var(--sapButton_Track_Selected_Background);--_ui5_switch_track_border_radius:0.75rem;--_ui5_switch_track_disabled_checked_bg:var(--_ui5_switch_track_checked_bg);--_ui5_switch_track_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_track_disabled_semantic_checked_bg:var(--sapSuccessBackground);--_ui5_switch_track_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_disabled_semantic_bg:var(--sapErrorBackground);--_ui5_switch_track_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_width:2rem;--_ui5_switch_handle_height:2rem;--_ui5_switch_handle_border_width:1px;--_ui5_switch_handle_border_radius:1rem;--_ui5_switch_handle_bg:var(--sapButton_TokenBackground);--_ui5_switch_handle_checked_bg:var(--sapButton_Selected_Background);--_ui5_switch_handle_checked_border_color:var(--sapButton_Selected_BorderColor);--_ui5_switch_handle_semantic_hover_bg:var(--sapErrorBackground);--_ui5_switch_handle_semantic_checked_hover_bg:var(--sapSuccessBackground);--_ui5_switch_handle_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_compact_width:1.625rem;--_ui5_switch_handle_compact_height:1.625rem;--_ui5_switch_handle_disabled_bg:var(--_ui5_switch_handle_bg);--_ui5_switch_handle_disabled_checked_bg:var(--_ui5_switch_handle_checked_bg);--_ui5_switch_handle_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_handle_disabled_semantic_checked_bg:var(--sapButton_Background);--_ui5_switch_handle_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5_switch_text_on_semantic_color:var(--sapPositiveElementColor);--_ui5_switch_text_off_semantic_color:var(--sapNegativeElementColor);--_ui5_switch_text_disabled_color:var(--sapTextColor);--_ui5_tc_header_height:4.6875rem;--_ui5_tc_header_height_compact:3.6875rem;--_ui5_tc_header_height_text_only:3rem;--_ui5_tc_header_height_text_only_compact:2rem;--_ui5_tc_headeritem_text_selected_color:var(--sapSelectedColor);--_ui5_tc_headerItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_headerItem_positive_color:var(--sapPositiveColor);--_ui5_tc_headerItem_negative_color:var(--sapNegativeColor);--_ui5_tc_headerItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItem_neutral_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_neutral_selected_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_selected_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_selected_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_selected_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_focus_border:1px dotted var(--sapContent_FocusColor);--_ui5_tc_headerItemSemanticIcon_display:none;--_ui5_tc_overflowItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_overflowItem_positive_color:var(--sapPositiveColor);--_ui5_tc_overflowItem_negative_color:var(--sapNegativeColor);--_ui5_tc_overflowItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_border:1px solid var(--sapHighlightColor);--_ui5_tc_headerItemIcon_color:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_background:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_headerItemIcon_positive_selected_background:var(--sapPositiveColor);--_ui5_tc_headerItemIcon_negative_selected_background:var(--sapNegativeColor);--_ui5_tc_headerItemIcon_critical_selected_background:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_neutral_selected_background:var(--sapNeutralColor);--_ui5_tc_headerItemIcon_semantic_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_header_box_shadow:var(--sapContent_HeaderShadow);--_ui5_tc_header_border_bottom:0.0625rem solid var(--sapObjectHeader_Background);--_ui5_tc_headerItem_color:var(--sapContent_LabelColor);--_ui5_tc_headerItemContent_border_bottom:0.188rem solid var(--sapSelectedColor);--_ui5_tc_overflowItem_default_color:var(--sapHighlightColor);--_ui5_tc_overflowItem_current_color:CurrentColor;--_ui5_tc_content_border_bottom:0.0625rem solid var(--sapObjectHeader_BorderColor);--_ui5_textarea_focus_after_width:1px;--_ui5_textarea_warning_border_style:solid;--_ui5_textarea_warning_border_width:2px;--_ui5_TimelineItem_arrow_size:1.625rem;--_ui5_TimelineItem_bubble_outline_width:0.0625rem;--_ui5_TimelineItem_bubble_outline_top:-0.125rem;--_ui5_TimelineItem_bubble_outline_right:-0.125rem;--_ui5_TimelineItem_bubble_outline_bottom:-0.125rem;--_ui5_TimelineItem_bubble_outline_left:-0.625rem;--_ui5_TimelineItem_bubble_rtl_left_offset:-0.125rem;--_ui5_TimelineItem_bubble_rtl_right_offset:-0.625rem;--_ui5_time_picker_border:0.0625rem solid transparent;--_ui5_toast_vertical_offset:3rem;--_ui5_toast_horizontal_offset:2rem;--_ui5_toast_background:var(--sapList_Background);--_ui5_toast_shadow:var(--sapContent_Shadow2);--_ui5_wheelslider_item_text_size:var(--sapFontSize);--_ui5_wheelslider_label_text_size:var(--sapFontSmallSize);--_ui5_wheelslider_mobile_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*4);--_ui5_wheelslider_label_text_color:var(--sapContent_LabelColor);--_ui5_wheelslider_height:15rem;--_ui5_wheelslider_mobile_height:27rem;--_ui5_wheelslider_arrows_visibility:hidden;--_ui5_wheelslider_item_background_color:var(--sapLegend_WorkingBackground);--_ui5_wheelslider_item_text_color:var(--sapTextColor);--_ui_wheelslider_item_hover_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_item_border_color:var(--sapList_Background);--_ui5_wheelslider_item_hovered_border_color:var(--sapList_Background);--_ui5_wheelslider_collapsed_item_text_color:var(--_ui5_wheelslider_item_border_color);--_ui5_wheelslider_selected_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_active_item_text_color:var(--sapContent_Selected_TextColor);--_ui5_wheelslider_item_width:3rem;--_ui5_wheelslider_item_height:2.875rem;--_ui5_wheelslider_selection_frame_color:var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius:var(--_ui5_button_border_radius);--_ui5_toggle_button_pressed_focussed:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_pressed_focussed_hovered:var(--sapButton_Selected_BorderColor);--_ui5_yearpicker_item_selected_focus:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_border:none;--_ui5_yearpicker_item_margin:1px;--_ui5_yearpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_yearpicker_item_focus_after_offset:2px;--_ui5_yearpicker_item_border_radius:0.25rem;--_ui5_calendar_header_arrow_button_border:none;--_ui5_calendar_header_arrow_button_border_radius:0.25rem;--_ui5_calendar_header_middle_button_width:6.25rem;--_ui5_calendar_header_middle_button_flex:1 1 auto;--_ui5_calendar_header_middle_button_focus_border_radius:0.25rem;--_ui5_calendar_header_middle_button_focus_border:none;--_ui5_calendar_header_middle_button_focus_after_display:block;--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:0.125rem;--_ui5_calendar_header_middle_button_focus_after_left_offset:0.125rem;--ui5_table_header_row_outline_width:1px;--ui5_table_row_outline_width:1px;--ui5_title_level_1Size:1.625rem;--ui5_title_level_2Size:1.375rem;--ui5_title_level_3Size:1.250rem;--ui5_title_level_4Size:1.125rem;--ui5_title_level_5Size:1rem;--ui5_title_level_6Size:0.875rem;--_ui5_token_background:var(--sapButton_TokenBackground);--_ui5_token_border_radius:0.25rem;--_ui5_token_focus_outline_width:0.0625rem;--_ui5_token_text_color:var(--sapTextColor);--_ui5_token_icon_color:var(--sapContent_IconColor);--_ui5_value_state_message_border:none;--_ui5-multi_combobox_token_margin_top:1px}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_datetime_timeview_width:17rem;--_ui5_token_wrapper_left_padding:0;--_ui5_button_icon_font_size:1rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2)}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_button_base_height:1.625rem;--_ui5_button_base_padding:0.4375rem;--_ui5_button_base_min_width:2rem;--_ui5_calendar_header_height:2rem;--_ui5_calendar_header_padding:0;--_ui5_calendar_header_arrow_button_width:2rem;--_ui5_checkbox_root_side_padding:var(--_ui5_checkbox_wrapped_focus_padding);--_ui5_checkbox_wrapped_content_margin_top:var(--_ui5_checkbox_compact_wrapped_label_margin_top);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_width_height:var(--_ui5_checkbox_compact_width_height);--_ui5_checkbox_wrapper_padding:var(--_ui5_checkbox_compact_wrapper_padding);--_ui5_checkbox_focus_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_inner_width_height:var(--_ui5_checkbox_compact_inner_size);--_ui5_checkbox_icon_size:.75rem;--_ui5_custom_list_item_height:2rem;--_ui5_custom_list_item_rb_min_width:2rem;--_ui5_day_picker_item_width:2rem;--_ui5_day_picker_item_height:2rem;--_ui5_day_picker_empty_height:2.125rem;--_ui5_datetime_picker_height:17rem;--_ui5_datetime_picker_width:34.0625rem;--_ui5_datetime_timeview_phonemode_width:18.5rem;--_ui5_datetime_timeview_padding:0.5rem;--_ui5_input_height:var(--_ui5_input_compact_height);--_ui5_input_inner_padding:0 0.5rem;--_ui5_input_icon_min_width:var(--_ui5_input_compact_min_width);--_ui5_input_icon_padding:.25rem .5rem;--_ui5_input_value_state_icon_padding:.1875rem .5rem;--_ui5_textarea_padding:.1875rem .5rem;--_ui5_list_no_data_height:2rem;--_ui5_list_item_cb_margin_right:.5rem;--_ui5_list_item_title_size:var(--sapFontSize);--_ui5_list_item_img_size:1.75rem;--_ui5_list_item_img_margin:0.55rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2rem;--_ui5_list_busy_row_height:2rem;--_ui5_month_picker_item_height:2rem;--_ui5_panel_header_height:2rem;--_ui5_year_picker_item_height:2rem;--_ui5_tokenizer_root_padding:0.125rem;--_ui5_token_height:1.125rem;--_ui5_token_icon_size:.75rem;--_ui5_token_icon_padding:0.1rem 0.25rem;--_ui5_token_wrapper_right_padding:0.25rem;--_ui5_tl_bubble_padding:.5rem;--_ui5_tl_indicator_before_bottom:-.5rem;--_ui5_tl_padding:.5rem;--_ui5_tl_li_margin_bottom:.5rem;--_ui5_rb_height:2rem;--_ui5_rb_label_side_padding:.5rem;--_ui5_rb_focus_dist:.375rem;--_ui5_rb_inner_size:2rem;--_ui5_rb_svg_size:1rem;--_ui5_rb_label_width:calc(100% - 2rem + 1px);--_ui5_rb_rtl_focus_right:0.375rem;--_ui5_wheelslider_item_width:4rem;--_ui5_wheelslider_item_height:2rem;--_ui5_wheelslider_height:14rem;--_ui5_wheelslider_arrows_visibility:visible;--_ui5_switch_height:var(--_ui5_switch_compact_height);--_ui5_switch_width:var(--_ui5_switch_compact_width);--_ui5_switch_handle_height:var(--_ui5_switch_handle_compact_height);--_ui5_switch_handle_width:var(--_ui5_switch_handle_compact_width);--_ui5_switch_text_on_left:calc(-100% + 1.5625rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.5rem);--_ui5_switch_no_label_width:var(--_ui5_switch_compact_no_label_width);--_ui5_switch_track_no_label_height:var(--_ui5_switch_track_compact_no_label_height);--_ui5_switch_rtl_transform:translateX(-100%) translateX(1.5rem);--_ui5_switch_text_right:calc(-100% + 1.5625rem);--_ui5_tc_item_text:2rem;--_ui5_tc_item_text_line_height:1.325rem;--_ui5_tc_item_icon_size:1rem;--_ui5_tc_item_add_text_margin_top:0.3125rem;--_ui5_tc_header_height:var(--_ui5_tc_header_height_compact);--_ui5_radiobutton_min_width:var(--_ui5_radiobutton_min_width_compact);--_ui5-responnsive_popover_header_height:2.5rem;--ui5_side_navigation_item_height:2rem;--_ui5-tree-indent-step:0.5rem;--_ui5-tree-toggle-box-width:2rem;--_ui5-tree-toggle-box-height:1.5rem;--_ui5-tree-toggle-icon-size:0.8125rem}";

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var iconCss = ":host(:not([hidden])){display:inline-block}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([interactive][focused]) .ui5-icon-root{outline:1px dotted var(--sapContent_FocusColor)}:host(:not([dir=ltr])) .ui5-icon-root[dir=rtl]{transform:scale(-1);transform-origin:center}.ui5-icon-root{display:flex;transform:scaleY(-1);transform-origin:center;outline:none}";

const ICON_NOT_FOUND$1 = "ICON_NOT_FOUND";

/**
 * @public
 */
const metadata$1 = {
	tag: "ui5-icon",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.Icon.prototype */ {
		/**
		 * Defines if the icon is interactive (focusable and pressable)
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		interactive: {
			type: Boolean,
		},

		/**
		 * Defines the unique identifier (icon name) of each <code>ui5-icon</code>.
		 * <br><br>
		 * To browse all available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * <br><br>
		 * Example:
		 * <br>
		 * <code>name='add'</code>, <code>name='delete'</code>, <code>name='employee'</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		*/
		name: {
			type: String,
		},

		/**
		 * Defines the text alternative of the <code>ui5-icon</code>.
		 * If not provided a default text alternative will be set, if present.
		 * <br><br>
		 * <b>Note:</b> Every icon should have a text alternative in order to
		 * calculate its accessible name.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Defines whether the <code>ui5-icon</code> should have a tooltip.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showTooltip: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		pathData: {
			type: String,
			noAttribute: true,
		},

		/**
		 * @private
		 */
		accData: {
			type: Object,
			noAttribute: true,
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		* @private
		*/
		invalid: {
			type: Boolean,
		},
	},
	events: {
		/**
		 * Fired on mouseup, space and enter if icon is interactive
		 * @private
		 * @since 1.0.0-rc.8
		 */
		click: {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component represents an SVG icon.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
 * <br><br>
 * A large set of built-in icons is available
 * and they can be used by setting the <code>name</code> property on the <code>ui5-icon</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Icon
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-icon
 * @public
 */
class Icon extends UI5Element {
	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata$1;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0;
	}

	static get styles() {
		return iconCss;
	}

	static async onDefine() {
		this.createGlobalStyle(); // hide all icons until the first icon has rendered (and added the Icon.css)
		await fetchI18nBundle("@ui5/webcomponents");
	}

	_onfocusin(event) {
		if (this.interactive) {
			this.focused = true;
		}
	}

	_onfocusout(event) {
		this.focused = false;
	}

	_onkeydown(event) {
		if (this.interactive && isEnter(event)) {
			this.fireEvent("click");
		}
	}

	_onkeyup(event) {
		if (this.interactive && isSpace(event)) {
			this.fireEvent("click");
		}
	}

	_onclick(event) {
		if (this.interactive) {
			event.preventDefault();
			// Prevent the native event and fire custom event because otherwise the noConfict event won't be thrown
			this.fireEvent("click");
		}
	}

	get _dir() {
		if (!this.effectiveDir) {
			return;
		}

		if (this.ltr) {
			return "ltr";
		}

		return this.effectiveDir;
	}

	get tabIndex() {
		return this.interactive ? "0" : "-1";
	}

	get role() {
		if (this.interactive) {
			return "button";
		}

		return this.accessibleNameText ? "img" : "presentation";
	}

	static createGlobalStyle() {
		if (!window.ShadyDOM) {
			return;
		}
		const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
		if (!styleElement) {
			createStyleInHead(`ui5-icon { display: none !important; }`, { "data-ui5-icon-global": "" });
		}
	}

	static removeGlobalStyle() {
		if (!window.ShadyDOM) {
			return;
		}
		const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
		if (styleElement) {
			document.head.removeChild(styleElement);
		}
	}

	async onBeforeRendering() {
		const name = this.name;
		if (!name) {
			/* eslint-disable-next-line */
			return console.warn("Icon name property is required", this);
		}
		let iconData = getIconDataSync(name);
		if (!iconData) {
			iconData = await getIconData(name);
		}

		if (iconData === ICON_NOT_FOUND$1) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/icons/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/Assets.js".`);
		}

		if (!iconData) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
		}

		this.pathData = iconData.pathData;
		this.accData = iconData.accData;
		this.ltr = iconData.ltr;
	}

	get hasIconTooltip() {
		return this.showTooltip && this.accessibleNameText;
	}

	get accessibleNameText() {
		if (this.accessibleName) {
			return this.accessibleName;
		}

		return this.i18nBundle.getText(this.accData) || undefined;
	}

	async onEnterDOM() {
		setTimeout(() => {
			this.constructor.removeGlobalStyle(); // remove the global style as Icon.css is already in place
		}, 0);
	}
}

Icon.define();

let currentZIndex = 100;

const getFocusedElement = () => {
	let element = document.activeElement;

	while (element.shadowRoot && element.shadowRoot.activeElement) {
		element = element.shadowRoot.activeElement;
	}

	return (element && typeof element.focus === "function") ? element : null;
};

const isFocusedElementWithinNode = node => {
	const fe = getFocusedElement();

	if (fe) {
		return isNodeContainedWithin(node, fe);
	}

	return false;
};

const isNodeContainedWithin = (parent, child) => {
	let currentNode = parent;

	if (currentNode.shadowRoot) {
		currentNode = Array.from(currentNode.shadowRoot.children).find(n => n.localName !== "style");
	}

	if (currentNode === child) {
		return true;
	}

	const childNodes = currentNode.localName === "slot" ? currentNode.assignedNodes() : currentNode.children;

	if (childNodes) {
		return Array.from(childNodes).some(n => isNodeContainedWithin(n, child));
	}
};

const isPointInRect = (x, y, rect) => {
	return x >= rect.left && x <= rect.right
		&& y >= rect.top && y <= rect.bottom;
};

const isClickInRect = (event, rect) => {
	let x;
	let y;

	if (event.touches) {
		const touch = event.touches[0];
		x = touch.clientX;
		y = touch.clientY;
	} else {
		x = event.clientX;
		y = event.clientY;
	}

	return isPointInRect(x, y, rect);
};

const getClosedPopupParent = el => {
	const parent = el.parentElement || (el.getRootNode && el.getRootNode().host);

	if ((parent.openBy && parent.isUI5Element) || (parent.open && parent.isUI5Element) || parent === document.documentElement) {
		return parent;
	}

	return getClosedPopupParent(parent);
};


const getNextZIndex = () => {
	currentZIndex += 2;
	return currentZIndex;
};

const block0$1 = (context) => { return html`${ context._isPhone ? block1$1(context) : block5(context) }`; };
const block1$1 = (context) => { return html`<ui5-dialog ?with-padding=${context.withPadding} stretch _disable-initial-focus @ui5-before-open="${ifDefined(context._propagateDialogEvent)}" @ui5-after-open="${ifDefined(context._afterDialogOpen)}" @ui5-before-close="${ifDefined(context._propagateDialogEvent)}" @ui5-after-close="${ifDefined(context._afterDialogClose)}">${ !context._hideHeader ? block2(context) : undefined }<slot></slot><slot slot="footer" name="footer"></slot></ui5-dialog>`; };
const block2 = (context) => { return html`${ context.header.length ? block3() : block4(context) }`; };
const block3 = (context) => { return html`<slot slot="header" name="header"></slot>`; };
const block4 = (context) => { return html`<header class="ui5-responsive-popover-header"><ui5-title level="H5" class="ui5-responsive-popover-header-text">${ifDefined(context.headerText)}</ui5-title><ui5-button icon="decline" design="Transparent" @click="${context.close}"></ui5-button></header>`; };
const block5 = (context) => { return html`<section style="${styleMap(context.styles.root)}" class="${classMap(context.classes.root)}" role="dialog" aria-modal="${ifDefined(context._ariaModal)}" aria-label="${ifDefined(context._ariaLabel)}" aria-labelledby="${ifDefined(context._ariaLabelledBy)}"><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(context.styles.arrow)}"></span>${ context._displayHeader ? block6(context) : undefined }<div style="${styleMap(context.styles.content)}" class="${classMap(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div>${ context._displayFooter ? block9(context) : undefined }<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section>`; };
const block6 = (context) => { return html`<header class="ui5-popup-header-root" id="ui5-popup-header">${ context.header.length ? block7() : block8(context) }</header>`; };
const block7 = (context) => { return html`<slot name="header"></slot>`; };
const block8 = (context) => { return html`<h2 class="ui5-popup-header-text">${ifDefined(context.headerText)}</h2>`; };
const block9 = (context) => { return html`${ context.footer.length ? block10() : undefined }`; };
const block10 = (context) => { return html`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`; };

const isNodeHidden = node => {
	if (node.nodeName === "SLOT") {
		return false;
	}

	return (node.offsetWidth <= 0 && node.offsetHeight <= 0) || node.style.visibility === "hidden";
};

const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;

const isNodeClickable = node => {
	if (node.disabled) {
		return false;
	}

	const tabIndex = node.getAttribute("tabindex");
	if (tabIndex !== null && tabIndex !== undefined) {
		return parseInt(tabIndex) >= 0;
	}

	return rFocusable.test(node.nodeName)
		|| (rClickable.test(node.nodeName)
		&& node.href);
};

const isFocusTrap = el => {
	return el.hasAttribute("data-ui5-focus-trap");
};

const getFirstFocusableElement = container => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, true);
};

const getLastFocusableElement = container => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, false);
};

const findFocusableElement = (container, forward) => {
	let child;

	if (container.shadowRoot) {
		child = forward ? container.shadowRoot.firstChild : container.shadowRoot.lastChild;
	} else if (container.assignedNodes && container.assignedNodes()) {
		const assignedElements = container.assignedNodes();
		child = forward ? assignedElements[0] : assignedElements[assignedElements.length - 1];
	} else {
		child = forward ? container.firstChild : container.lastChild;
	}

	let focusableDescendant;

	while (child) {
		const originalChild = child;

		child = child.isUI5Element ? child.getFocusDomRef() : child;
		if (!child) {
			return null;
		}

		if (child.nodeType === 1 && !isNodeHidden(child) && !isFocusTrap(child)) {
			if (isNodeClickable(child)) {
				return (child && typeof child.focus === "function") ? child : null;
			}

			focusableDescendant = findFocusableElement(child, forward);
			if (focusableDescendant) {
				return (focusableDescendant && typeof focusableDescendant.focus === "function") ? focusableDescendant : null;
			}
		}

		child = forward ? originalChild.nextSibling : originalChild.previousSibling;
	}

	return null;
};

const block0$2 = (context) => { return html`<section style="${styleMap(context.styles.root)}" class="${classMap(context.classes.root)}" role="dialog" aria-modal="${ifDefined(context._ariaModal)}" aria-label="${ifDefined(context._ariaLabel)}" aria-labelledby="${ifDefined(context._ariaLabelledBy)}"><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><div style="${styleMap(context.styles.content)}" class="${classMap(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section> `; };

const block0$3 = (context) => { return html`<div class="ui5-block-layer" ?hidden=${context._blockLayerHidden} style="${styleMap(context.styles.blockLayer)}"></div>`; };

let openedRegistry = [];

const addOpenedPopup = (instance, parentPopovers = []) => {
	if (!openedRegistry.includes(instance)) {
		openedRegistry.push({
			instance,
			parentPopovers,
		});
	}

	if (openedRegistry.length === 1) {
		attachGlobalListener();
	}
};

const removeOpenedPopup = instance => {
	openedRegistry = openedRegistry.filter(el => {
		return el !== instance.instance;
	});

	if (!openedRegistry.length) {
		detachGlobalListener();
	}
};

const getOpenedPopups = () => {
	return [...openedRegistry];
};

const _keydownListener = event => {
	if (!openedRegistry.length) {
		return;
	}

	if (isEscape(event)) {
		openedRegistry.pop().instance.close(true);
	}
};

const attachGlobalListener = () => {
	document.addEventListener("keydown", _keydownListener);
};

const detachGlobalListener = () => {
	document.removeEventListener("keydown", _keydownListener);
};

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var styles = ":host{min-width:1px;display:none;position:fixed}";

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var staticAreaStyles = ".ui5-block-layer{display:none;position:fixed;background-color:var(--sapBlockLayer_Background);opacity:.6;top:-500px;left:-500px;right:-500px;bottom:-500px;outline:none;pointer-events:all;z-index:-1}.ui5-block-layer:not([hidden]){display:inline-block}";

/**
 * @public
 */
const metadata$2 = {
	managedSlots: true,
	slots: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {

		/**
		 * Defines the content of the Popup.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {
		/**
		 * Defines the ID of the HTML Element, which will get the initial focus.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		initialFocus: {
			type: String,
		},

		/**
		 * Defines if the focus should be returned to the previously focused element,
		 * when the popup closes.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		*/
		preventFocusRestore: {
			type: Boolean,
		},

		/**
		 * Indicates if the elements is open
		 * @private
		 * @type {boolean}
		 * @defaultvalue false
		 */
		opened: {
			type: Boolean,
		},

		/**
		 * Defines the aria-label attribute for the popup
		 *
		 * @type {String}
		 * @defaultvalue: ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * @private
		 */
		_disableInitialFocus: {
			type: Boolean,
		},

		_blockLayerHidden: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {

		/**
		 * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening. This event does not bubble.
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#before-open
		 */
		"before-open": {},

		/**
		 * Fired after the component is opened. This event does not bubble.
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#after-open
		 */
		"after-open": {},

		/**
		 * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. This event does not bubble.
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#before-close
		 * @param {Boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
		 */
		"before-close": {
			escPressed: { type: Boolean },
		},

		/**
		 * Fired after the component is closed. This event does not bubble.
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#after-close
		 */
		"after-close": {},
	},
};

let customBlockingStyleInserted = false;

const createBlockingStyle = () => {
	if (customBlockingStyleInserted) {
		return;
	}

	createStyleInHead(`
		.ui5-popup-scroll-blocker {
			width: 100%;
			height: 100%;
			position: fixed;
			overflow: hidden;
		}
	`, { "data-ui5-popup-scroll-blocker": "" });

	customBlockingStyleInserted = true;
};

createBlockingStyle();

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Base class for all popup Web Components.
 *
 * If you need to create your own popup-like custom UI5 Web Components, it is highly recommended that you extend
 * at least Popup in order to have consistency with other popups in terms of modal behavior and z-index management.
 *
 * 1. The Popup class handles modality:
 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
 *  - Derivatives may call the "blockBodyScrolling" and "unblockBodyScrolling" static methods to temporarily remove scrollbars on the body
 *  - Derivatives may call the "open" and "close" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
 *
 *  2. Provides blocking layer (relevant for modal popups only):
 *   - It is in the static area
 *   - Controlled by the "open" and "close" methods
 *
 * 3. The Popup class "traps" focus:
 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
 *
 * 4. The Popup class automatically assigns "z-index"
 *  - Each time a popup is opened, it gets a higher than the previously opened popup z-index
 *
 * 5. The template of this component exposes two inline partials you can override in derivatives:
 *  - beforeContent (upper part of the box, useful for header/title/close button)
 *  - afterContent (lower part, useful for footer/action buttons)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popup
 * @extends sap.ui.webcomponents.base.UI5Element
 * @public
 */
class Popup extends UI5Element {
	static get metadata() {
		return metadata$2;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return styles;
	}

	static get template() {
		return block0$2;
	}

	static get staticAreaTemplate() {
		return block0$3;
	}

	static get staticAreaStyles() {
		return staticAreaStyles;
	}

	/**
	 * Temporarily removes scrollbars from the body
	 * @protected
	 */
	static blockBodyScrolling() {
		document.body.style.top = `-${window.pageYOffset}px`;
		document.body.classList.add("ui5-popup-scroll-blocker");
	}

	/**
	 * Restores scrollbars on the body, if needed
	 * @protected
	 */
	static unblockBodyScrolling() {
		document.body.classList.remove("ui5-popup-scroll-blocker");
		window.scrollTo(0, -parseFloat(document.body.style.top));
		document.body.style.top = "";
	}

	_scroll(e) {
		this.fireEvent("scroll", {
			scrollTop: e.target.scrollTop,
			targetRef: e.target,
		});
	}

	/**
	 * Focus trapping
	 * @private
	 */
	forwardToFirst() {
		const firstFocusable = getFirstFocusableElement(this);

		if (firstFocusable) {
			firstFocusable.focus();
		}
	}

	/**
	 * Focus trapping
	 * @private
	 */
	forwardToLast() {
		const lastFocusable = getLastFocusableElement(this);

		if (lastFocusable) {
			lastFocusable.focus();
		}
	}

	/**
	 * Use this method to focus the element denoted by "initialFocus", if provided, or the first focusable element otherwise.
	 * @protected
	 */
	applyInitialFocus() {
		this.applyFocus();
	}

	/**
	 * Focuses the element denoted by <code>initialFocus</code>, if provided,
	 * or the first focusable element otherwise.
	 * @public
	 */
	applyFocus() {
		const element = this.getRootNode().getElementById(this.initialFocus)
			|| document.getElementById(this.initialFocus)
			|| getFirstFocusableElement(this);

		if (element) {
			element.focus();
		}
	}

	/**
	 * Override this method to provide custom logic for the popup's open/closed state. Maps to the "opened" property by default.
	 * @public
	 * @returns {boolean}
	 */
	isOpen() {
		return this.opened;
	}

	isFocusWithin() {
		return isFocusedElementWithinNode(this.shadowRoot.querySelector(".ui5-popup-root"));
	}

	/**
	 * Shows the block layer (for modal popups only) and sets the correct z-index for the purpose of popup stacking
	 * @param {boolean} preventInitialFocus prevents applying the focus inside the popup
	 * @public
	 */
	open(preventInitialFocus) {
		const prevented = !this.fireEvent("before-open", {}, true, false);
		if (prevented) {
			return;
		}

		if (this.isModal) {
			// create static area item ref for block layer
			this.getStaticAreaItemDomRef();
			this._blockLayerHidden = false;
			Popup.blockBodyScrolling();
		}

		this._zIndex = getNextZIndex();
		this.style.zIndex = this._zIndex;
		this._focusedElementBeforeOpen = getFocusedElement();
		this.show();

		if (!this._disableInitialFocus && !preventInitialFocus) {
			this.applyInitialFocus();
		}

		this._addOpenedPopup();

		this.opened = true;
		this.fireEvent("after-open", {}, false, false);
	}

	/**
	 * Adds the popup to the "opened popups registry"
	 * @protected
	 */
	_addOpenedPopup() {
		addOpenedPopup(this);
	}

	/**
	 * Hides the block layer (for modal popups only)
	 * @public
	 */
	close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
		if (!this.opened) {
			return;
		}

		const prevented = !this.fireEvent("before-close", { escPressed }, true, false);
		if (prevented) {
			return;
		}

		if (this.isModal) {
			this._blockLayerHidden = true;
			Popup.unblockBodyScrolling();
		}

		this.hide();
		this.opened = false;

		if (!preventRegistryUpdate) {
			this._removeOpenedPopup();
		}

		if (!this.preventFocusRestore && !preventFocusRestore) {
			this.resetFocus();
		}

		this.fireEvent("after-close", {}, false, false);
	}

	/**
	 * Removes the popup from the "opened popups registry"
	 * @protected
	 */
	_removeOpenedPopup() {
		removeOpenedPopup(this);
	}

	/**
	 * Returns the focus to the previously focused element
	 * @protected
	 */
	resetFocus() {
		if (!this._focusedElementBeforeOpen) {
			return;
		}

		this._focusedElementBeforeOpen.focus();
		this._focusedElementBeforeOpen = null;
	}

	/**
	 * Sets "block" display to the popup
	 * @protected
	 */
	show() {
		this.style.display = "block";
	}


	/**
	 * Sets "none" display to the popup
	 * @protected
	 */
	hide() {
		this.style.display = "none";
	}

	onExitDOM() {
		if (this.isOpen()) {
			Popup.unblockBodyScrolling();
			this._removeOpenedPopup();
		}
	}

	/**
	 * Implement this getter with relevant logic regarding the modality of the popup (f.e. based on a public property)
	 *
	 * @protected
	 * @abstract
	 * @returns {boolean}
	 */
	get isModal() {} // eslint-disable-line

	/**
	 * Return the ID of an element in the shadow DOM that is going to label this popup
	 *
	 * @protected
	 * @abstract
	 * @returns {String}
	 */
	get _ariaLabelledBy() {} // eslint-disable-line

	/**
	 * Return the value for aria-modal for this popup
	 *
	 * @protected
	 * @abstract
	 * @returns {String}
	 */
	get _ariaModal() {} // eslint-disable-line

	/**
	 * Ensures ariaLabel is never null or empty string
	 * @returns {String|undefined}
	 * @protected
	 */
	get _ariaLabel() {
		return this.ariaLabel || undefined;
	}

	get styles() {
		return {
			root: {},
			content: {},
			blockLayer: {
				"zIndex": (this._zIndex - 1),
			},
		};
	}

	get classes() {
		return {
			root: {},
			content: {},
		};
	}
}

/**
 * @lends sap.ui.webcomponents.main.types.PopoverPlacementType.prototype
 * @public
 */
const PopoverPlacementTypes = {
	/**
	 * Popover will be placed at the left side of the reference element.
	 * @public
	 * @type {Left}
	 */
	Left: "Left",

	/**
	 * Popover will be placed at the right side of the reference element.
	 * @public
	 * @type {Right}
	 */
	Right: "Right",

	/**
	 * Popover will be placed at the top of the reference element.
	 * @public
	 * @type {Bottom}
	 */
	Top: "Top",

	/**
	 * Popover will be placed at the bottom of the reference element.
	 * @public
	 * @type {Bottom}
	 */
	Bottom: "Bottom",
};

/**
 * @class
 * Types for the placement of Popover control.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.PopoverPlacementType
 * @public
 * @enum {string}
 */
class PopoverPlacementType extends DataType {
	static isValid(value) {
		return !!PopoverPlacementTypes[value];
	}
}

PopoverPlacementType.generataTypeAcessors(PopoverPlacementTypes);

/**
 * @lends sap.ui.webcomponents.main.types.PopoverVerticalAlign.prototype
 * @public
 */
const PopoverVerticalAligns = {
	/**
	 *
	 * @public
	 * @type {Center}
	 */
	Center: "Center",

	/**
	 * Popover will be placed at the top of the reference control.
	 * @public
	 * @type {Top}
	 */
	Top: "Top",

	/**
	 * Popover will be placed at the bottom of the reference control.
	 * @public
	 * @type {Bottom}
	 */
	Bottom: "Bottom",

	/**
	 * Popover will be streched
	 * @public
	 * @type {Stretch}
	 */
	Stretch: "Stretch",
};

/**
 * @class
 * Types for the placement of message Popover control.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.PopoverVerticalAlign
 * @public
 * @enum {string}
 */
class PopoverVerticalAlign extends DataType {
	static isValid(value) {
		return !!PopoverVerticalAligns[value];
	}
}

PopoverVerticalAlign.generataTypeAcessors(PopoverVerticalAligns);

/**
 * @lends sap.ui.webcomponents.main.types.PopoverHorizontalAlign.prototype
 * @public
 */
const PopoverHorizontalAligns = {
	/**
	 * Popover is centered
	 * @public
	 * @type {Center}
	 */
	Center: "Center",

	/**
	 * Popover opens on the left side of the target
	 * @public
	 * @type {Left}
	 */
	Left: "Left",

	/**
	 * Popover opens on the right side of the target
	 * @public
	 * @type {Right}
	 */
	Right: "Right",

	/**
	 * Popover is stretched
	 * @public
	 * @type {Stretch}
	 */
	Stretch: "Stretch",
};

/**
 * @class
 * Defines the horizontal alignment of <code>ui5-popover</code>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.PopoverHorizontalAlign
 * @public
 * @enum {string}
 */
class PopoverHorizontalAlign extends DataType {
	static isValid(value) {
		return !!PopoverHorizontalAligns[value];
	}
}

PopoverHorizontalAlign.generataTypeAcessors(PopoverHorizontalAligns);

let updateInterval = null;
const intervalTimeout = 300;
const openedRegistry$1 = [];

const repositionPopovers = event => {
	openedRegistry$1.forEach(popover => {
		popover.instance.reposition();
	});
};

const attachGlobalScrollHandler = () => {
	document.body.addEventListener("scroll", repositionPopovers, true);
};

const detachGlobalScrollHandler = () => {
	document.body.removeEventListener("scroll", repositionPopovers, true);
};

const runUpdateInterval = () => {
	updateInterval = setInterval(() => {
		repositionPopovers();
	}, intervalTimeout);
};

const stopUpdateInterval = () => {
	clearInterval(updateInterval);
};

const attachGlobalClickHandler = () => {
	document.addEventListener("mousedown", clickHandler);
};

const detachGlobalClickHandler = () => {
	document.removeEventListener("mousedown", clickHandler);
};

const clickHandler = event => {
	const openedPopups = getOpenedPopups();
	const isTopPopupPopover = openedPopups[openedPopups.length - 1].instance.openBy;

	if (openedPopups.length === 0 || !isTopPopupPopover) {
		return;
	}

	// loop all open popovers
	for (let i = (openedPopups.length - 1); i !== -1; i--) {
		const popup = openedPopups[i].instance;

		// if popup is modal, opener is clicked, popup is dialog skip closing
		if (popup.isModal || popup.isOpenerClicked(event)) {
			return;
		}

		if (isClickInRect(event, popup.getBoundingClientRect())) {
			break;
		}

		popup.close();
	}
};

const attachScrollHandler = popover => {
	popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, true);
};

const detachScrollHandler = popover => {
	popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers);
};

const addOpenedPopover = instance => {
	const parentPopovers = getParentPopoversIfNested(instance);

	addOpenedPopup(instance, parentPopovers);
	openedRegistry$1.push({
		instance,
		parentPopovers,
	});

	attachScrollHandler(instance);

	if (openedRegistry$1.length === 1) {
		attachGlobalScrollHandler();
		attachGlobalClickHandler();
		runUpdateInterval();
	}
};

const removeOpenedPopover = instance => {
	const popoversToClose = [instance];

	for (let i = 0; i < openedRegistry$1.length; i++) {
		const indexOfCurrentInstance = openedRegistry$1[i].parentPopovers.indexOf(instance);
		if (openedRegistry$1[i].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
			popoversToClose.push(openedRegistry$1[i].instance);
		}
	}

	for (let i = popoversToClose.length - 1; i >= 0; i--) {
		for (let j = 0; j < openedRegistry$1.length; j++) {
			let indexOfItemToRemove;
			if (popoversToClose[i] === openedRegistry$1[j].instance) {
				indexOfItemToRemove = j;
			}


			if (indexOfItemToRemove >= 0) {
				removeOpenedPopup(openedRegistry$1[indexOfItemToRemove].instance);
				detachScrollHandler(openedRegistry$1[indexOfItemToRemove].instance);
				const itemToClose = openedRegistry$1.splice(indexOfItemToRemove, 1);
				itemToClose[0].instance.close(false, true);
			}
		}
	}

	if (!openedRegistry$1.length) {
		detachGlobalScrollHandler();
		detachGlobalClickHandler();
		stopUpdateInterval();
	}
};

const getParentPopoversIfNested = instance => {
	let currentElement = instance.parentNode;
	const parentPopovers = [];

	while (currentElement.parentNode) {
		for (let i = 0; i < openedRegistry$1.length; i++) {
			if (currentElement && currentElement === openedRegistry$1[i].instance) {
				parentPopovers.push(currentElement);
			}
		}

		currentElement = currentElement.parentNode;
	}

	return parentPopovers;
};

const block0$4 = (context) => { return html`<section style="${styleMap(context.styles.root)}" class="${classMap(context.classes.root)}" role="dialog" aria-modal="${ifDefined(context._ariaModal)}" aria-label="${ifDefined(context._ariaLabel)}" aria-labelledby="${ifDefined(context._ariaLabelledBy)}"><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(context.styles.arrow)}"></span>${ context._displayHeader ? block1$2(context) : undefined }<div style="${styleMap(context.styles.content)}" class="${classMap(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div>${ context._displayFooter ? block4$1(context) : undefined }<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section> `; };
const block1$2 = (context) => { return html`<header class="ui5-popup-header-root" id="ui5-popup-header">${ context.header.length ? block2$1() : block3$1(context) }</header>`; };
const block2$1 = (context) => { return html`<slot name="header"></slot>`; };
const block3$1 = (context) => { return html`<h2 class="ui5-popup-header-text">${ifDefined(context.headerText)}</h2>`; };
const block4$1 = (context) => { return html`${ context.footer.length ? block5$1() : undefined }`; };
const block5$1 = (context) => { return html`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var PopupsCommonCss = ":host{display:none;position:fixed;min-width:6.25rem;background:var(--sapGroup_ContentBackground);box-shadow:var(--sapContent_Shadow2);border-radius:.25rem;min-height:2rem;box-sizing:border-box}.ui5-popup-root{background:inherit;border-radius:inherit;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;max-height:94vh;max-width:90vw}@media screen and (-ms-high-contrast:active){.ui5-popup-root{border:1px solid var(--sapPageFooter_BorderColor)}}.ui5-popup-root .ui5-popup-header-root{box-shadow:var(--sapContent_Shadow0);margin-bottom:.125rem}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor);color:var(--sapPageFooter_TextColor)}.ui5-popup-footer-root,.ui5-popup-header-root,:host([header-text]) .ui5-popup-header-text{margin:0;color:var(--sapPageHeader_TextColor);font-size:1rem;font-weight:400;font-family:var(--sapFontFamily);display:flex;justify-content:center;align-items:center}.ui5-popup-content{overflow:auto;padding:var(--_ui5_popup_content_padding);box-sizing:border-box}:host([no-padding]) .ui5-popup-content{padding:0}:host([header-text]) .ui5-popup-header-text{padding:0 .25rem;text-align:center;min-height:3rem;max-height:3rem;line-height:3rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}:host(:not([header-text])) .ui5-popup-header-text{display:none}";

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var PopoverCss = ".ui5-popover-arrow{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.ui5-popover-arrow:after{content:\"\";display:block;width:.7rem;height:.7rem;background-color:var(--sapGroup_ContentBackground);box-shadow:var(--sapContent_Shadow3);transform:rotate(-45deg)}:host([actual-placement-type=Bottom]) .ui5-popover-arrow{left:calc(50% - .5625rem);top:-.5rem;height:.5625rem}:host([actual-placement-type=Bottom]) .ui5-popover-arrow:after{margin:.1875rem 0 0 .1875rem}:host([actual-placement-type=Left]) .ui5-popover-arrow{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}:host([actual-placement-type=Left]) .ui5-popover-arrow:after{margin:.1875rem 0 0 -.375rem}:host([actual-placement-type=Top]) .ui5-popover-arrow{left:calc(50% - .5625rem);height:.5625rem;bottom:calc(-1*(var(--_ui5_popup_content_padding) + 2px))}:host([actual-placement-type=Top]) .ui5-popover-arrow:after{margin:-.375rem 0 0 .125rem}:host(:not([actual-placement-type])) .ui5-popover-arrow,:host([actual-placement-type=Right]) .ui5-popover-arrow{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}:host(:not([actual-placement-type])) .ui5-popover-arrow:after,:host([actual-placement-type=Right]) .ui5-popover-arrow:after{margin:.125rem 0 0 .25rem}:host([no-arrow]) .ui5-popover-arrow{display:none}";

const arrowSize = 8;

/**
 * @public
 */
const metadata$3 = {
	tag: "ui5-popover",
	properties: /** @lends sap.ui.webcomponents.main.Popover.prototype */ {
		/**
		 * Defines the header text.
		 * <br><br>
		 * <b>Note:</b> If <code>header</code> slot is provided, the <code>headerText</code> is ignored.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Determines on which side the <code>ui5-popover</code> is placed at.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Left</code></li>
		 * <li><code>Right</code></li>
		 * <li><code>Top</code></li>
		 * <li><code>Bottom</code></li>
		 * </ul>
		 *
		 * @type {PopoverPlacementType}
		 * @defaultvalue "Right"
		 * @public
		 */
		placementType: {
			type: PopoverPlacementType,
			defaultValue: PopoverPlacementType.Right,
		},

		/**
		 * Determines the horizontal alignment of the <code>ui5-popover</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Center</code></li>
		 * <li><code>Left</code></li>
		 * <li><code>Right</code></li>
		 * <li><code>Stretch</code></li>
		 * </ul>
		 *
		 * @type {PopoverHorizontalAlign}
		 * @defaultvalue "Center"
		 * @public
		 */
		horizontalAlign: {
			type: PopoverHorizontalAlign,
			defaultValue: PopoverHorizontalAlign.Center,
		},

		/**
		 * Determines the vertical alignment of the <code>ui5-popover</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Center</code></li>
		 * <li><code>Top</code></li>
		 * <li><code>Bottom</code></li>
		 * <li><code>Stretch</code></li>
		 * </ul>
		 *
		 * @type {PopoverVerticalAlign}
		 * @defaultvalue "Center"
		 * @public
		 */
		verticalAlign: {
			type: PopoverVerticalAlign,
			defaultValue: PopoverVerticalAlign.Center,
		},

		/**
		 * Defines whether the <code>ui5-popover</code> should close when
		 * clicking/tapping outside of the popover.
		 * If enabled, it blocks any interaction with the background.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		modal: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-popover</code> arrow is hidden.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		noArrow: {
			type: Boolean,
		},

		/**
		 * Determines if there is no enough space, the <code>ui5-popover</code> can be placed
		 * over the target.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		allowTargetOverlap: {
			type: Boolean,
		},

		/**
		 * Sets the X translation of the arrow
		 *
		 * @private
		 */
		arrowTranslateX: {
			type: Integer,
			defaultValue: 0,
			noAttribute: true,
		},

		/**
		 * Sets the Y translation of the arrow
		 *
		 * @private
		 */
		arrowTranslateY: {
			type: Integer,
			defaultValue: 0,
			noAttribute: true,
		},

		/**
		 * Returns the calculated placement depending on the free space
		 *
		 * @private
		 */
		actualPlacementType: {
			type: PopoverPlacementType,
			defaultValue: PopoverPlacementType.Right,
		},

		_maxContentHeight: { type: Integer },
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Popover.prototype */ {
		/**
		 * Defines the header HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the footer HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		footer: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Popover.prototype */ {
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-popover</code> component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * <h3>Structure</h3>
 *
 * The popover has three main areas:
 * <ul>
 * <li>Header (optional)</li>
 * <li>Content</li>
 * <li>Footer (optional)</li>
 * </ul>
 *
 * <b>Note:</b> The <code>ui5-popover</code> is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * <code>modal</code> property.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Popover.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popover
 * @extends Popup
 * @tagname ui5-popover
 * @since 1.0.0-rc.6
 * @public
 */
class Popover extends Popup {
	static get metadata() {
		return metadata$3;
	}

	static get styles() {
		return [PopupsCommonCss, PopoverCss];
	}

	static get template() {
		return block0$4;
	}

	static get MIN_OFFSET() {
		return 10; // px
	}

	isOpenerClicked(event) {
		const target = event.target;
		return target === this._opener || (target.getFocusDomRef && target.getFocusDomRef() === this._opener);
	}

	/**
	 * Opens the popover.
	 * @param {HTMLElement} opener the element that the popover is opened by
	 * @param {boolean} preventInitialFocus prevents applying the focus inside the popover
	 * @public
	 */
	openBy(opener, preventInitialFocus = false) {
		if (!opener || this.opened) {
			return;
		}

		this._opener = opener;

		super.open(preventInitialFocus);
	}

	/**
	 * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
	 * @private
	 */
	_addOpenedPopup() {
		addOpenedPopover(this);
	}

	/**
	 * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
	 * @private
	 */
	_removeOpenedPopup() {
		removeOpenedPopover(this);
	}

	shouldCloseDueToOverflow(placement, openerRect) {
		const threshold = 32;
		const limits = {
			"Right": openerRect.right,
			"Left": openerRect.left,
			"Top": openerRect.top,
			"Bottom": openerRect.bottom,
		};

		const closedPopupParent = getClosedPopupParent(this._opener);
		let overflowsBottom = false;
		let overflowsTop = false;

		if (closedPopupParent.openBy) {
			const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
			overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
			overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
		}

		return (limits[placement] < 0 || (limits[placement] + threshold > closedPopupParent.innerHeight)) || overflowsBottom || overflowsTop;
	}

	shouldCloseDueToNoOpener(openerRect) {
		return openerRect.top === 0
			&& openerRect.bottom === 0
			&& openerRect.left === 0
			&& openerRect.right === 0;
	}

	reposition() {
		this.show();
	}

	show() {
		let placement;
		const popoverSize = this.popoverSize;
		const openerRect = this._opener.getBoundingClientRect();

		if (this.shouldCloseDueToNoOpener(openerRect) && this.isFocusWithin()) {
			// reuse the old placement as the opener is not available,
			// but keep the popover open as the focus is within
			placement = this._oldPlacement;
		} else {
			placement = this.calcPlacement(openerRect, popoverSize);
		}

		const stretching = this.horizontalAlign === PopoverHorizontalAlign.Stretch;

		if (this._preventRepositionAndClose) {
			return this.close();
		}

		if (this._oldPlacement && (this._oldPlacement.left === placement.left) && (this._oldPlacement.top === placement.top) && stretching) {
			super.show();
			this.style.width = this._width;
			return;
		}

		this._oldPlacement = placement;

		const popoverOnLeftBorder = this._left === 0;
		const popoverOnTopBorder = this._top === 0;

		this.actualPlacementType = placement.placementType;
		this.arrowTranslateX = popoverOnLeftBorder ? placement.arrowX - Popover.MIN_OFFSET : placement.arrowX;
		this.arrowTranslateY = popoverOnTopBorder ? placement.arrowY - Popover.MIN_OFFSET : placement.arrowY;

		this.style.left = `${popoverOnLeftBorder ? Popover.MIN_OFFSET : this._left}px`;
		this.style.top = `${popoverOnTopBorder ? Popover.MIN_OFFSET : this._top}px`;
		super.show();

		if (stretching && this._width) {
			this.style.width = this._width;
		}
	}

	get popoverSize() {
		let width,
			height;
		let rect = this.getBoundingClientRect();

		if (this.opened) {
			width = rect.width;
			height = rect.height;

			return { width, height };
		}

		this.style.visibility = "hidden";
		this.style.display = "block";

		rect = this.getBoundingClientRect();

		width = rect.width;
		height = rect.height;

		this.hide();
		this.style.visibility = "visible";

		return { width, height };
	}

	get contentDOM() {
		return this.shadowRoot.querySelector(".ui5-popup-content");
	}

	get arrowDOM() {
		return this.shadowRoot.querySelector(".ui5-popover-arrow");
	}

	calcPlacement(targetRect, popoverSize) {
		let left = 0;
		let top = 0;
		const allowTargetOverlap = this.allowTargetOverlap;

		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;

		let maxHeight = clientHeight;

		let width = "";
		let height = "";

		const placementType = this.getActualPlacementType(targetRect, popoverSize);

		this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placementType, targetRect);

		const isVertical = placementType === PopoverPlacementType.Top
			|| placementType === PopoverPlacementType.Bottom;

		if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && isVertical) {
			popoverSize.width = targetRect.width;
			width = `${targetRect.width}px`;
		} else if (this.verticalAlign === PopoverVerticalAlign.Stretch && !isVertical) {
			popoverSize.height = targetRect.height;
			height = `${targetRect.height}px`;
		}

		this._width = width;
		this._height = height;

		const arrowOffset = this.noArrow ? 0 : arrowSize;

		// calc popover positions
		switch (placementType) {
		case PopoverPlacementType.Top:
			left = this.getVerticalLeft(targetRect, popoverSize);
			top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);

			if (!allowTargetOverlap) {
				maxHeight = targetRect.top - arrowOffset;
			}
			break;
		case PopoverPlacementType.Bottom:
			left = this.getVerticalLeft(targetRect, popoverSize);

			if (allowTargetOverlap) {
				top = Math.max(Math.min(targetRect.bottom + arrowOffset, clientHeight - popoverSize.height), 0);
			} else {
				top = targetRect.bottom + arrowOffset;
				maxHeight = clientHeight - targetRect.bottom - arrowOffset;
			}
			break;
		case PopoverPlacementType.Left:
			left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
			top = this.getHorizontalTop(targetRect, popoverSize);
			break;
		case PopoverPlacementType.Right:
			if (allowTargetOverlap) {
				left = Math.max(Math.min(targetRect.left + targetRect.width + arrowOffset, clientWidth - popoverSize.width), 0);
			} else {
				left = targetRect.left + targetRect.width + arrowOffset;
			}

			top = this.getHorizontalTop(targetRect, popoverSize);
			break;
		}

		// correct popover positions
		if (isVertical) {
			if (popoverSize.width > clientWidth || left < 0) {
				left = 0;
			} else if (left + popoverSize.width > clientWidth) {
				left -= left + popoverSize.width - clientWidth;
			}
		} else {
			if (popoverSize.height > clientHeight || top < 0) { // eslint-disable-line
				top = 0;
			} else if (top + popoverSize.height > clientHeight) {
				top -= top + popoverSize.height - clientHeight;
			}
		}

		let maxContentHeight = Math.round(maxHeight);

		const hasHeader = this.header.length || this.headerText;

		if (hasHeader) {
			const headerDomRef = this.shadowRoot.querySelector(".ui5-popup-header-root")
				|| this.shadowRoot.querySelector(".ui5-popup-header-text");

			if (headerDomRef) {
				maxContentHeight = Math.round(maxHeight - headerDomRef.offsetHeight);
			}
		}

		this._maxContentHeight = maxContentHeight;

		const arrowTranslateX = isVertical ? targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2 : 0;
		const arrowTranslateY = !isVertical ? targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2 : 0;

		if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
			this._left = Math.round(left);
		}

		if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
			this._top = Math.round(top);
		}

		return {
			arrowX: Math.round(arrowTranslateX),
			arrowY: Math.round(arrowTranslateY),
			top: this._top,
			left: this._left,
			placementType,
		};
	}

	/**
	 * Fallbacks to new placement, prioritizing <code>Left</code> and <code>Right</code> placements.
	 * @private
	 */
	fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
		if (targetRect.left > popoverSize.width) {
			return PopoverPlacementType.Left;
		}

		if (clientWidth - targetRect.right > targetRect.left) {
			return PopoverPlacementType.Right;
		}

		if (clientHeight - targetRect.bottom > popoverSize.height) {
			return PopoverPlacementType.Bottom;
		}

		if (clientHeight - targetRect.bottom < targetRect.top) {
			return PopoverPlacementType.Top;
		}
	}

	getActualPlacementType(targetRect, popoverSize) {
		const placementType = this.placementType;
		let actualPlacementType = placementType;

		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;

		switch (placementType) {
		case PopoverPlacementType.Top:
			if (targetRect.top < popoverSize.height
				&& targetRect.top < clientHeight - targetRect.bottom) {
				actualPlacementType = PopoverPlacementType.Bottom;
			}
			break;
		case PopoverPlacementType.Bottom:
			if (clientHeight - targetRect.bottom < popoverSize.height
				&& clientHeight - targetRect.bottom < targetRect.top) {
				actualPlacementType = PopoverPlacementType.Top;
			}
			break;
		case PopoverPlacementType.Left:
			if (targetRect.left < popoverSize.width) {
				actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
			}
			break;
		case PopoverPlacementType.Right:
			if (clientWidth - targetRect.right < popoverSize.width) {
				actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
			}
			break;
		}

		return actualPlacementType;
	}

	getVerticalLeft(targetRect, popoverSize) {
		let left;

		switch (this.horizontalAlign) {
		case PopoverHorizontalAlign.Center:
		case PopoverHorizontalAlign.Stretch:
			left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
			break;
		case PopoverHorizontalAlign.Left:
			left = targetRect.left;
			break;
		case PopoverHorizontalAlign.Right:
			left = targetRect.right - popoverSize.width;
			break;
		}

		return left;
	}

	getHorizontalTop(targetRect, popoverSize) {
		let top;

		switch (this.verticalAlign) {
		case PopoverVerticalAlign.Center:
		case PopoverVerticalAlign.Stretch:
			top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
			break;
		case PopoverVerticalAlign.Top:
			top = targetRect.top;
			break;
		case PopoverVerticalAlign.Bottom:
			top = targetRect.bottom - popoverSize.height;
			break;
		}

		return top;
	}

	get isModal() { // Required by Popup.js
		return this.modal;
	}

	get _ariaLabelledBy() { // Required by Popup.js
		return this.ariaLabel ? undefined : "ui5-popup-header";
	}

	get _ariaModal() { // Required by Popup.js
		return true;
	}

	get styles() {
		return {
			...super.styles,
			content: {
				"max-height": `${this._maxContentHeight}px`,
			},
			arrow: {
				transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
			},
		};
	}

	get classes() {
		return {
			root: {
				"ui5-popup-root": true,
			},
			content: {
				"ui5-popup-content": true,
			},
		};
	}

	/**
	 * Hook for descendants to hide header.
	 */
	get _displayHeader() {
		return true;
	}

	/**
	 * Hook for descendants to hide footer.
	 */
	get _displayFooter() {
		return true;
	}
}

Popover.define();

const block0$5 = (context) => { return html`<section style="${styleMap(context.styles.root)}" class="${classMap(context.classes.root)}" role="dialog" aria-modal="${ifDefined(context._ariaModal)}" aria-label="${ifDefined(context._ariaLabel)}" aria-labelledby="${ifDefined(context._ariaLabelledBy)}"><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToLast}></span><header class="ui5-popup-header-root" id="ui5-popup-header">${ context.header.length ? block1$3() : block2$2(context) }</header><div style="${styleMap(context.styles.content)}" class="${classMap(context.classes.content)}"  @scroll="${context._scroll}"><slot></slot></div>${ context.footer.length ? block3$2() : undefined }<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${context.forwardToFirst}></span></section> `; };
const block1$3 = (context) => { return html`<slot name="header"></slot>`; };
const block2$2 = (context) => { return html`<h2 class="ui5-popup-header-text">${ifDefined(context.headerText)}</h2>`; };
const block3$2 = (context) => { return html`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var dialogCSS = ":host{top:50%;left:50%;transform:translate(-50%,-50%);min-width:20rem;box-shadow:var(--sapContent_Shadow3)}:host([stretch]){width:90%;height:90%}:host([stretch][on-phone]){width:100%;height:100%}:host([stretch][on-phone]) .ui5-popup-root{max-height:100vh;max-width:100vw}.ui5-popup-root{display:flex;flex-direction:column;max-width:100vw}.ui5-popup-content{flex:1 1 auto}";

/**
 * @public
 */
const metadata$4 = {
	tag: "ui5-dialog",
	slots: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {
		/**
		 * Defines the header HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the footer HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		footer: {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Dialog.prototype */ {
		/**
		 * Defines the header text.
		 * <br><br>
		 * <b>Note:</b> If <code>header</code> slot is provided, the <code>headerText</code> is ignored.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Determines whether the <code>ui5-dialog</code> should be stretched to fullscreen.
		 * <br><br>
		 * <b>Note:</b> The <code>ui5-dialog</code> will be stretched to aproximetly
		 * 90% of the viewport.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		stretch: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		onPhone: {
			type: Boolean,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-dialog</code> component is used to temporarily display some information in a
 * size-limited window in front of the regular app screen.
 * It is used to prompt the user for an action or a confirmation.
 * The <code>ui5-dialog</code> interrupts the current app processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The dialog combines concepts known from other technologies where the windows have
 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 * <br><br>
 * The <code>ui5-dialog</code> is modal, which means that user action is required before returning to the parent window is possible.
 * The content of the <code>ui5-dialog</code> is fully customizable.
 *
 * <h3>Structure</h3>
 * A <code>ui5-dialog</code> consists of a header, content, and a footer for action buttons.
 * The <code>ui5-dialog</code> is usually displayed at the center of the screen.
 *
 * <h3>Responsive Behavior</h3>
 * The <code>stretch</code> property can be used to stretch the
 * <code>ui5-dialog</code> on full screen.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Dialog";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Dialog
 * @extends Popup
 * @tagname ui5-dialog
 * @public
 */
class Dialog extends Popup {
	static get metadata() {
		return metadata$4;
	}

	static get template() {
		return block0$5;
	}

	static get styles() {
		return [PopupsCommonCss, dialogCSS];
	}

	onBeforeRendering() {
		this.onPhone = isPhone();
	}

	get isModal() { // Required by Popup.js
		return true;
	}

	get _ariaLabelledBy() { // Required by Popup.js
		return this.ariaLabel ? undefined : "ui5-popup-header";
	}

	get _ariaModal() { // Required by Popup.js
		return true;
	}

	get classes() {
		return {
			root: {
				"ui5-popup-root": true,
			},
			content: {
				"ui5-popup-content": true,
			},
		};
	}
}

Dialog.define();

const findNodeOwner = node => {
	if (!(node instanceof HTMLElement)) {
		throw new Error("Argument node should be of type HTMLElement");
	}

	const ownerTypes = [HTMLHtmlElement, HTMLIFrameElement];
	let currentShadowRootFlag = true;
	let currentCustomElementFlag = true;

	while (node) {
		if (node.toString() === "[object ShadowRoot]") {
			// Web Component
			// or the shadow root of web component with attached shadow root
			if (currentShadowRootFlag) {
				currentShadowRootFlag = false;
			}
			if (!currentCustomElementFlag && !currentShadowRootFlag) {
				return node;
			}
		} else if (node.tagName && node.tagName.indexOf("-") > -1) {
			if (currentCustomElementFlag) {
				currentCustomElementFlag = false;
			} else {
				return node;
			}
		} else if (ownerTypes.indexOf(node.constructor) > -1) {
			// Document or Iframe reached
			return node;
		}

		node = node.parentNode || node.host;
	}
};

const getEffectiveAriaLabelText = el => {
	if (!el.ariaLabelledby) {
		if (el.ariaLabel) {
			return el.ariaLabel;
		}

		return undefined;
	}

	const ids = el.ariaLabelledby.split(" ");
	const owner = findNodeOwner(el);
	let result = "";

	ids.forEach((elementId, index) => {
		const element = owner.querySelector(`[id='${elementId}']`);
		result += `${element ? element.textContent : ""}`;

		if (index < ids.length - 1) {
			result += " ";
		}
	});

	return result;
};

/**
 * @lends sap.ui.webcomponents.main.types.ButtonDesign.prototype
 * @public
 */
const ButtonTypes = {
	/**
	 * default type (no special styling)
	 * @public
	 * @type {Default}
	 */
	Default: "Default",

	/**
	 * accept type (green button)
	 * @public
	 * @type {Positive}
	 */
	Positive: "Positive",

	/**
	 * reject style (red button)
	 * @public
	 * @type {Negative}
	 */
	Negative: "Negative",

	/**
	 * transparent type
	 * @public
	 * @type {Transparent}
	 */
	Transparent: "Transparent",

	/**
	 * emphasized type
	 * @public
	 * @type {Emphasized}
	 */
	Emphasized: "Emphasized",
};

/**
 * @class
 * Different types of Button.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ButtonDesign
 * @public
 * @enum {string}
 */
class ButtonDesign extends DataType {
	static isValid(value) {
		return !!ButtonTypes[value];
	}
}

ButtonDesign.generataTypeAcessors(ButtonTypes);

const block0$6 = (context) => { return html`<button type="button" class="ui5-button-root" ?disabled="${context.disabled}" data-sap-focus-ref  dir="${ifDefined(context.effectiveDir)}" @focusout=${context._onfocusout} @focusin=${context._onfocusin} @click=${context._onclick} @mousedown=${context._onmousedown} @mouseup=${context._onmouseup} @keydown=${context._onkeydown} @keyup=${context._onkeyup} tabindex=${ifDefined(context.tabIndexValue)} aria-expanded="${ifDefined(context.accInfo.ariaExpanded)}" aria-controls="${ifDefined(context.accInfo.ariaControls)}" aria-haspopup="${ifDefined(context.accInfo.ariaHaspopup)}" aria-label="${ifDefined(context.ariaLabelText)}" title="${ifDefined(context.accInfo.title)}" part="button">${ context.icon ? block1$4(context) : undefined }<span id="${ifDefined(context._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${ context.hasButtonType ? block2$3(context) : undefined }</button> `; };
const block1$4 = (context) => { return html`<ui5-icon class="ui5-button-icon" name="${ifDefined(context.icon)}" show-tooltip=${ifDefined(context.iconOnly)}></ui5-icon>`; };
const block2$3 = (context) => { return html`<span class="ui5-hidden-text">${ifDefined(context.buttonTypeText)}</span>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var buttonCss = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5_button_base_min_width);height:var(--_ui5_button_base_height);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5_button_text_shadow);border-radius:var(--_ui5_button_border_radius);border-width:.0625rem;cursor:pointer;background-color:var(--sapButton_Background);border:1px solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([has-icon]) button[dir=rtl].ui5-button-root .ui5-button-text{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}:host([has-icon][icon-end]) button[dir=rtl].ui5-button-root .ui5-button-icon{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit}:host(:not([active]):hover),:host(:not([hidden]).ui5_hovered){background:var(--sapButton_Hover_Background)}.ui5-button-icon{font-size:var(--_ui5_button_icon_font_size);height:0;top:-.5rem;position:relative;color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-left:var(--_ui5_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{max-width:calc(100% - 1rem);margin-left:var(--_ui5_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-left:0}:host([disabled]){opacity:.5;pointer-events:none}:host([focused]){outline:var(--_ui5_button_outline);outline-offset:var(--_ui5_button_outline_offset)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([active]:not([disabled])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--_ui5_button_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([active]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Positive]){background-color:var(--sapButton_Accept_Background);border-color:var(--_ui5_button_positive_border_color);color:var(--sapButton_Accept_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Positive]:hover){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--_ui5_button_positive_border_hover_color)}:host([design=Positive][active]){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--_ui5_button_positive_border_active_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Positive][focused]){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_positive_focus_border_color)}:host([design=Positive][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Negative]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Negative]:hover){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor)}:host([design=Negative][focused]){border-color:var(--_ui5_button_negative_focus_border_color);outline-color:var(--_ui5_button_positive_border_focus_hover_color)}:host([design=Negative][active]){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--_ui5_button_negative_active_border_color);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Negative][active][focused]){outline-color:var(--sapContent_ContrastFocusColor)}:host([design=Emphasized]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);color:var(--sapButton_Emphasized_TextColor);text-shadow:0 0 .125rem var(--sapButton_Emphasized_TextShadow);font-weight:var(--_ui5_button_emphasized_font_weight)}:host([design=Emphasized]:not([active]):hover){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor)}:host([design=Empasized][active]){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Emphasized][focused]){outline-color:var(--sapContent_ContrastFocusColor);border-color:var(--_ui5_button_emphasized_focused_border_color)}:host([design=Transparent]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);text-shadow:var(--_ui5_button_text_shadow);border-color:var(--_ui5_button_transparent_border_color)}:host([design=Transparent]):hover{background-color:var(--sapButton_Lite_Hover_Background)}:host([design=Transparent][active]){background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Transparent]:not([active]):hover){border-color:var(--_ui5_button_transparent_hover_border_color)}ui5-button[focused]{outline:none}ui5-button[focused] .ui5-button-root{position:relative}ui5-button[focused] .ui5-button-root:after{content:\"\";position:absolute;border-width:1px;border-style:dotted;border-color:var(--_ui5_button_focus_color);top:var(--_ui5_button_focus_offset);bottom:var(--_ui5_button_focus_offset);left:var(--_ui5_button_focus_offset);right:var(--_ui5_button_focus_offset)}ui5-button[active] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button[design=Positive][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}ui5-button[design=Positive][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button[design=Negative][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}ui5-button[design=Negative][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button[design=Emphasized][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}ui5-button ui5-icon.ui5-button-icon{height:var(--_ui5_button_icon_font_size);top:0}";

let isGlobalHandlerAttached = false;
let activeButton = null;

/**
 * @public
 */
const metadata$5 = {
	tag: "ui5-button",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.Button.prototype */ {

		/**
		 * Defines the <code>ui5-button</code> design.
		 * <br><br>
		 * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
		 * "Negative", and "Transparent".
		 *
		 * @type {ButtonDesign}
		 * @defaultvalue "Default"
		 * @public
		 */
		design: {
			type: ButtonDesign,
			defaultValue: ButtonDesign.Default,
		},

		/**
		 * Defines whether the <code>ui5-button</code> is disabled
		 * (default is set to <code>false</code>).
		 * A disabled <code>ui5-button</code> can't be pressed or
		 * focused, and it is not in the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the icon to be displayed as graphical element within the <code>ui5-button</code>.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 * Example:
		 * <br>
		 * <pre>ui5-button icon="palette"</pre>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether the icon should be displayed after the <code>ui5-button</code> text.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * When set to <code>true</code>, the <code>ui5-button</code> will
		 * automatically submit the nearest form element upon <code>press</code>.
		 * <br><br>
		 * <b>Important:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		submits: {
			type: Boolean,
		},

		/**
		 * Used to switch the active state (pressed or not) of the <code>ui5-button</code>.
		 * @private
		 */
		active: {
			type: Boolean,
		},

		/**
		 * Defines if a content has been added to the default slot
		 * @private
		 */
		iconOnly: {
			type: Boolean,
		},

		/**
		 * Indicates if the elements is on focus
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * Indicates if the elements has a slotted icon
		 * @private
		 */
		hasIcon: {
			type: Boolean,
		},

		/**
		 * Defines the aria-label attribute for the button
		 * @type {String}
		 * @defaultvalue: ""
		 * @private
		 * @since 1.0.0-rc.7
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Receives id(or many ids) of the elements that label the button
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.7
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		/**
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaExpanded: {
			type: String,
		},

		/**
		 * Indicates if the element if focusable
		 * @private
		 */
		nonFocusable: {
			type: Boolean,
		},

		_iconSettings: {
			type: Object,
		},
		_buttonAccInfo: {
			type: Object,
		},

		/**
		 * Defines the tabIndex of the component.
		 * @private
		 */
		_tabIndex: {
			type: String,
			defaultValue: "0",
			noAttribute: true,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Button.prototype */ {
		/**
		 * Defines the text of the <code>ui5-button</code>.
		 * <br><br>
		 * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Button.prototype */ {

		/**
		 * Fired when the <code>ui5-button</code> is activated either with a
		 * mouse/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event will not be fired if the <code>disabled</code>
		 * property is set to <code>true</code>.
		 *
		 * @event
		 * @public
		 */
		click: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Button
 * @extends UI5Element
 * @tagname ui5-button
 * @public
 */
class Button extends UI5Element {
	static get metadata() {
		return metadata$5;
	}

	static get styles() {
		return buttonCss;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$6;
	}

	constructor() {
		super();

		this._deactivate = () => {
			if (activeButton) {
				activeButton.active = false;
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);

			isGlobalHandlerAttached = true;
		}

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		const FormSupport = getFeature("FormSupport");
		if (this.submits && !FormSupport) {
			console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		this.iconOnly = this.isIconOnly;
		this.hasIcon = !!this.icon;
	}

	_onclick(event) {
		event.isMarked = "button";
		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.triggerFormSubmit(this);
		}
	}

	_onmousedown(event) {
		event.isMarked = "button";
		this.active = true;
		activeButton = this; // eslint-disable-line
	}

	_onmouseup(event) {
		event.isMarked = "button";
	}

	_onkeydown(event) {
		event.isMarked = "button";

		if (isSpace(event) || isEnter(event)) {
			this.active = true;
		}
	}

	_onkeyup(event) {
		if (isSpace(event) || isEnter(event)) {
			this.active = false;
		}
	}

	_onfocusout(_event) {
		this.active = false;
		this.focused = false;
	}

	_onfocusin(event) {
		event.isMarked = "button";
		this.focused = true;
	}

	get hasButtonType() {
		return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
	}

	get isIconOnly() {
		return !Array.from(this.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).length;
	}

	get accInfo() {
		return {
			"ariaExpanded": this.ariaExpanded || (this._buttonAccInfo && this._buttonAccInfo.ariaExpanded),
			"ariaControls": this._buttonAccInfo && this._buttonAccInfo.ariaControls,
			"ariaHaspopup": this._buttonAccInfo && this._buttonAccInfo.ariaHaspopup,
			"title": this._buttonAccInfo && this._buttonAccInfo.title,
		};
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	static typeTextMappings() {
		return {
			"Positive": BUTTON_ARIA_TYPE_ACCEPT,
			"Negative": BUTTON_ARIA_TYPE_REJECT,
			"Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
		};
	}

	get buttonTypeText() {
		return this.i18nBundle.getText(Button.typeTextMappings()[this.design]);
	}

	get tabIndexValue() {
		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.nonFocusable ? "-1" : this._tabIndex;
	}

	static async onDefine() {
		await Promise.all([
			Icon.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

Button.define();

/**
 * @lends sap.ui.webcomponents.main.types.TitleLevel.prototype
 * @public
 */
const TitleLevels = {
	/**
	 * Renders <code>h1</code> tag.
	 * @public
	 * @type {H1}
	 */
	H1: "H1",

	/**
	 * Renders <code>h2</code> tag.
	 * @public
	 * @type {H2}
	 */
	H2: "H2",

	/**
	 * Renders <code>h3</code> tag.
	 * @public
	 * @type {H3}
	 */
	H3: "H3",

	/**
	 * Renders <code>h4</code> tag.
	 * @public
	 * @type {H4}
	 */
	H4: "H4",

	/**
	 * Renders <code>h5</code> tag.
	 * @public
	 * @type {H5}
	 */
	H5: "H5",

	/**
	 * Renders <code>h6</code> tag.
	 * @public
	 * @type {H6}
	 */
	H6: "H6",
};

/**
 * @class
 * Defines the <code>ui5-title</code> level
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TitleLevel
 * @public
 * @enum {string}
 */
class TitleLevel extends DataType {
	static isValid(value) {
		return !!TitleLevels[value];
	}
}

TitleLevel.generataTypeAcessors(TitleLevels);

const block0$7 = (context) => { return html`${ context.h1 ? block1$5(context) : undefined }${ context.h2 ? block2$4(context) : undefined }${ context.h3 ? block3$3(context) : undefined }${ context.h4 ? block4$2(context) : undefined }${ context.h5 ? block5$2(context) : undefined }${ context.h6 ? block6$1(context) : undefined }`; };
const block1$5 = (context) => { return html`<h1 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h1>`; };
const block2$4 = (context) => { return html`<h2 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h2>`; };
const block3$3 = (context) => { return html`<h3 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h3>`; };
const block4$2 = (context) => { return html`<h4 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h4>`; };
const block5$2 = (context) => { return html`<h5 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h5>`; };
const block6$1 = (context) => { return html`<h6 class="ui5-title-root"><span id="${ifDefined(context._id)}-inner"><slot></slot></span></h6>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var titleCss = ":host(:not([hidden])){display:block;cursor:text}:host{max-width:100%;color:var(--sapGroup_TitleTextColor);font-family:var(--sapFontFamily);text-shadow:var(--sapContent_TextShadow)}.ui5-title-root{display:inline-block;position:relative;font-weight:400;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;vertical-align:bottom;-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;margin:0;cursor:inherit}:host([wrap]) .ui5-title-root{white-space:pre-line}:host .ui5-title-root{font-size:var(--ui5_title_level_2Size)}:host([level=H1]) .ui5-title-root{font-size:var(--ui5_title_level_1Size)}:host([level=H2]) .ui5-title-root{font-size:var(--ui5_title_level_2Size)}:host([level=H3]) .ui5-title-root{font-size:var(--ui5_title_level_3Size)}:host([level=H4]) .ui5-title-root{font-size:var(--ui5_title_level_4Size)}:host([level=H5]) .ui5-title-root{font-size:var(--ui5_title_level_5Size)}:host([level=H6]) .ui5-title-root{font-size:var(--ui5_title_level_6Size)}";

/**
 * @public
 */
const metadata$6 = {
	tag: "ui5-title",
	properties: /** @lends sap.ui.webcomponents.main.Title.prototype */ {

		/**
		 * Defines whether the <code>ui5-title</code> would wrap.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		*/
		wrap: {
			type: Boolean,
		},

		/**
		 * Defines the <code>ui5-title</code> level.
		 * Available options are: <code>"H6"</code> to <code>"H1"</code>.
		 *
		 * @type {TitleLevel}
		 * @defaultvalue "H2"
		 * @public
		*/
		level: {
			type: TitleLevel,
			defaultValue: TitleLevel.H2,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Title.prototype */ {
		/**
		 * Defines the text of the <code>ui5-title</code>.
		 * <br><br>
		 * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-title</code> component is used to display titles inside a page.
 * It is a simple, large-sized text with explicit header/title semantics.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Title";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Title
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-title
 * @public
 */
class Title extends UI5Element {
	static get metadata() {
		return metadata$6;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$7;
	}

	static get styles() {
		return titleCss;
	}

	get normalizedLevel() {
		return this.level.toLowerCase();
	}

	get h1() {
		return this.normalizedLevel === "h1";
	}

	get h2() {
		return this.normalizedLevel === "h2";
	}

	get h3() {
		return this.normalizedLevel === "h3";
	}

	get h4() {
		return this.normalizedLevel === "h4";
	}

	get h5() {
		return this.normalizedLevel === "h5";
	}

	get h6() {
		return this.normalizedLevel === "h6";
	}
}

Title.define();

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var ResponsivePopoverCss = ":host{--_ui5_input_width:100%;min-width:6.25rem;min-height:2rem}:host(:not([with-padding])){--_ui5_popup_content_padding:0}:host([opened]){display:inline-block}.ui5-responsive-popover-header{height:var(--_ui5-responnsive_popover_header_height);display:flex;justify-content:space-between;align-items:center;padding:0 0 0 1rem;box-shadow:var(--sapContent_HeaderShadow)}:host [dir=rtl] .ui5-responsive-popover-header{padding:0 1rem 0 0}.ui5-responsive-popover-header-text{display:flex;align-items:center;width:calc(100% - var(--_ui5_button_base_min_width))}";

const POPOVER_MIN_WIDTH = 100;

/**
 * @public
 */
const metadata$7 = {
	tag: "ui5-responsive-popover",
	properties: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {

		/**
		 * Defines whether the component will stretch to fit its content.
		 * <br/><b>Note:</b> by default the popover will be as wide as its opener component and will grow if the content is not fitting.
		 * <br/><b>Note:</b> if set to true, it will take only as much space as it needs.
		 * @private
		 */
		noStretch: {
			type: Boolean,
		},

		/**
		 * Defines if padding would be added around the content.
		 * @private
		 */
		withPadding: {
			type: Boolean,
		},

		/**
		 * Defines if only the content would be displayed (without header and footer) in the popover on Desktop.
		 * By default both the header and footer would be displayed.
		 * @private
		 */
		contentOnlyOnDesktop: {
			type: Boolean,
		},

		/**
		 * Used internaly for controls which must not have header.
		 * @private
		 */
		_hideHeader: {
			type: Boolean,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-responsive-popover</code> acts as a Popover on desktop and tablet, while on phone it acts as a Dialog.
 * The component improves tremendously the user experience on mobile.
 *
 * <h3>Usage</h3>
 * Use it when you want to make sure that all the content is visible on any device.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ResponsivePopover
 * @extends Popover
 * @tagname ui5-responsive-popover
 * @since 1.0.0-rc.6
 * @public
 */
class ResponsivePopover extends Popover {
	static get metadata() {
		return metadata$7;
	}

	static get styles() {
		return [...Popover.styles, ResponsivePopoverCss];
	}

	static get template() {
		return block0$1;
	}

	static async onDefine() {
		await Promise.all([
			Button.define(),
			Dialog.define(),
			Title.define(),
		]);
	}

	/**
	 * Opens popover on desktop and dialog on mobile.
	 * @param {HTMLElement} opener the element that the popover is opened by
	 * @public
	 */
	open(opener) {
		this.style.display = this._isPhone ? "contents" : "";

		if (this.isOpen() || (this._dialog && this._dialog.isOpen())) {
			return;
		}

		if (!isPhone()) {
			// make popover width be >= of the opener's width
			if (!this.noStretch) {
				this._minWidth = Math.max(POPOVER_MIN_WIDTH, opener.getBoundingClientRect().width);
			}

			this.openBy(opener);
		} else {
			this.style.zIndex = getNextZIndex();
			this._dialog.open();
		}
	}

	/**
	 * Closes the popover/dialog.
	 * @public
	 */
	close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
		if (!isPhone()) {
			super.close(escPressed, preventRegistryUpdate, preventFocusRestore);
		} else {
			this._dialog.close();
		}
	}

	toggle(opener) {
		if (this.isOpen()) {
			return this.close();
		}

		this.open(opener);
	}

	isOpen() {
		return isPhone() ? this._dialog.isOpen() : super.isOpen();
	}

	get styles() {
		const popoverStyles = super.styles;

		popoverStyles.root = {
			"min-width": `${this._minWidth}px`,
		};

		return popoverStyles;
	}

	get _dialog() {
		return this.shadowRoot.querySelector("ui5-dialog");
	}

	get _isPhone() {
		return isPhone();
	}

	get _displayHeader() {
		return this._isPhone || !this.contentOnlyOnDesktop;
	}

	get _displayFooter() {
		return this._isPhone || !this.contentOnlyOnDesktop;
	}

	_afterDialogOpen(event) {
		this.opened = true;
		this._propagateDialogEvent(event);
	}

	_afterDialogClose(event) {
		this.opened = false;
		this._propagateDialogEvent(event);
	}

	_propagateDialogEvent(event) {
		const type = event.type.replace("ui5-", "");

		this.fireEvent(type, event.detail);
	}
}

ResponsivePopover.define();

const name$2 = "slim-arrow-left";
const pathData$2 = "M351.5 421q12 12 0 23-5 5-11 5t-11-5l-166-165q-9-10-9-23t9-23l165-164q5-5 11.5-5t11.5 5 5 11-5 11l-159 159q-6 6 0 12z";
const ltr$2 = false;

registerIcon(name$2, { pathData: pathData$2, ltr: ltr$2});

const name$3 = "slim-arrow-right";
const pathData$3 = "M357.5 233q10 10 10 23t-10 23l-165 165q-12 11-23 0t0-23l160-159q6-6 0-12l-159-159q-5-5-5-11t5-11 11-5 11 5z";
const ltr$3 = false;

registerIcon(name$3, { pathData: pathData$3, ltr: ltr$3});

const block0$8 = (context) => { return html`<div class="ui5-calheader-root" dir="${ifDefined(context.effectiveDir)}" @keydown=${context._onkeydown}><div id="${ifDefined(context._id)}-btnPrev" class="${ifDefined(context._btnPrev.classes)}" @click=${context._handlePrevPress} data-sap-cal-head-button="Prev"><ui5-icon class="ui5-calheader-arrowicon" name="${ifDefined(context._btnPrev.icon)}"></ui5-icon></div><div class="ui5-calheader-midcontainer"><div id="${ifDefined(context._id)}-btn1" class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" type="${ifDefined(context._btn1.type)}" tabindex="0" @click=${context._showMonthPicker} data-sap-show-picker="Month">${ifDefined(context._btn1.text)}</div><div id="${ifDefined(context._id)}-btn2" class="ui5-calheader-arrowbtn ui5-calheader-middlebtn" type="${ifDefined(context._btn2.type)}" tabindex="0" @click=${context._showYearPicker} data-sap-show-picker="Year">${ifDefined(context._btn2.text)}</div></div><div class="${ifDefined(context._btnNext.classes)}" @click=${context._handleNextPress} id="${ifDefined(context._id)}-btnNext" data-sap-cal-head-button="Next"><ui5-icon class="ui5-calheader-arrowicon" name="${ifDefined(context._btnNext.icon)}"></ui5-icon></div></div>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var styles$1 = ":host{display:inline-block;width:100%}.ui5-calheader-root{display:flex;height:var(--_ui5_calendar_header_height);padding:var(--_ui5_calendar_header_padding);box-sizing:border-box}.ui5-calheader-root ui5-button{height:100%}.ui5-calheader-arrowbtn{display:flex;justify-content:center;align-items:center;width:var(--_ui5_calendar_header_arrow_button_width);background-color:var(--sapButton_Lite_Background);color:var(--sapButton_TextColor);cursor:pointer;overflow:hidden;white-space:nowrap;padding:0;font-size:var(--sapFontSize)}.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled,.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled:active,.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled:focus,.ui5-calheader-arrowbtn.ui5-calheader-arrowbtn-disabled:hover{pointer-events:none;opacity:.4;outline:none;background-color:var(--sapButton_Lite_Background);color:var(--sapButton_TextColor)}.ui5-calheader-arrowbtn:focus{outline:none}.ui5-calheader-arrowbtn:hover{background-color:var(--sapButton_Hover_Background);color:var(--sapButton_Hover_TextColor)}.ui5-calheader-arrowbtn:active{background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor)}.ui5-calheader-arrowbtn,.ui5-calheader-middlebtn{border:var(--_ui5_calendar_header_arrow_button_border);border-radius:var(--_ui5_calendar_header_arrow_button_border_radius)}.ui5-calheader-arrowicon{color:currentColor;pointer-events:none}.ui5-calheader-midcontainer{display:flex;justify-content:space-around;flex:1 1 auto;padding:0 .5rem}.ui5-calheader-midcontainer .ui5-calheader-middlebtn:first-child{margin-right:.5rem}.ui5-calheader-middlebtn{font-family:var(--sapFontFamily);width:var(--_ui5_calendar_header_middle_button_width);flex:var(--_ui5_calendar_header_middle_button_flex);position:relative;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui5-calheader-middlebtn:focus{border:var(--_ui5_calendar_header_middle_button_focus_border);border-radius:var(--_ui5_calendar_header_middle_button_focus_border_radius)}.ui5-calheader-middlebtn:focus:after{content:\"\";display:var(--_ui5_calendar_header_middle_button_focus_after_display);width:var(--_ui5_calendar_header_middle_button_focus_after_width);height:var(--_ui5_calendar_header_middle_button_focus_after_height);border:1px dotted var(--sapContent_FocusColor);position:absolute;top:var(--_ui5_calendar_header_middle_button_focus_after_top_offset);left:var(--_ui5_calendar_header_middle_button_focus_after_left_offset)}.ui5-calheader-middlebtn:focus:active:after{border-color:var(--sapContent_ContrastFocusColor)}[dir=rtl] .ui5-calheader-root-midcontainer .ui5-calheader-middlebtn:first-child{margin-left:.5rem;margin-right:0}";

const metadata$8 = {
	tag: "ui5-calendar-header",
	properties: {
		monthText: {
			type: String,
		},
		yearText: {
			type: String,
		},
		_btnPrev: {
			type: Object,
		},
		_btnNext: {
			type: Object,
		},
		_btn1: {
			type: Object,
		},
		_btn2: {
			type: Object,
		},
		_isNextButtonDisabled: {
			type: Boolean,
		},
		_isPrevButtonDisabled: {
			type: Boolean,
		},
	},
	events: {
		"previous-press": {},
		"next-press": {},
		"show-month-press": {},
		"show-year-press": {},
	},
};

class CalendarHeader extends UI5Element {
	static get metadata() {
		return metadata$8;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$8;
	}

	static get styles() {
		return styles$1;
	}

	constructor() {
		super();
		this._btnPrev = {};
		this._btnPrev.icon = "slim-arrow-left";

		this._btnNext = {};
		this._btnNext.icon = "slim-arrow-right";

		this._btn1 = {};
		this._btn1.type = ButtonDesign.Transparent;

		this._btn2 = {};
		this._btn2.type = ButtonDesign.Transparent;
	}

	onBeforeRendering() {
		this._btn1.text = this.monthText;
		this._btn2.text = this.yearText;
		this._btnPrev.classes = "ui5-calheader-arrowbtn";
		this._btnNext.classes = "ui5-calheader-arrowbtn";

		if (this._isNextButtonDisabled) {
			this._btnNext.classes += " ui5-calheader-arrowbtn-disabled";
		}

		if (this._isPrevButtonDisabled) {
			this._btnPrev.classes += " ui5-calheader-arrowbtn-disabled";
		}
	}

	_handlePrevPress(event) {
		this.fireEvent("previous-press", event);
	}

	_handleNextPress(event) {
		this.fireEvent("next-press", event);
	}

	_showMonthPicker(event) {
		this.fireEvent("show-month-press", event);
	}

	_showYearPicker(event) {
		this.fireEvent("show-year-press", event);
	}

	_onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			const showPickerButton = event.target.getAttribute("data-sap-show-picker");

			if (showPickerButton) {
				this[`_show${showPickerButton}Picker`]();
			}
		}
	}

	static async onDefine() {
		await Promise.all([
			await Button.define(),
			await Icon.define(),
		]);
	}
}

CalendarHeader.define();

let formatSettings;

const getFirstDayOfWeek = () => {
	if (formatSettings === undefined) {
		formatSettings = getFormatSettings();
	}

	return formatSettings.firstDayOfWeek;
};

const NavigationMode = {
	Auto: "Auto",
	Vertical: "Vertical",
	Horizontal: "Horizontal",
	Paging: "Paging",
};

/**
 * @private
 * Different behavior for ItemNavigation.
 */
const ItemNavigationBehavior = {
	/**
	* Static behavior: when border of the items is reached, you can't go out of the cage.
 	*/
	Static: "Static",

	/**
	* Cycling behavior: when border of the items is reached, you can cycle through the items.
 	*/
	Cyclic: "Cyclic",

	/**
	* Paging behavior: when border of the items is reached, tou can go up/down based on the rowsize(e.g. DayPicker)
 	*/
	Paging: "Paging",
};

// navigatable items must have id and tabindex
class ItemNavigation extends EventProvider {
	constructor(rootWebComponent, options = {}) {
		super();

		this.currentIndex = options.currentIndex || 0;
		this.rowSize = options.rowSize || 1;
		this.behavior = options.behavior || ItemNavigationBehavior.Static;
		this.hasNextPage = true; // used in Paging mode and controlled from the rootWebComponent
		this.hasPrevPage = true; // used in Paging mode and controlled from the rootWebComponent
		const navigationMode = options.navigationMode;
		const autoNavigation = !navigationMode || navigationMode === NavigationMode.Auto;
		this.horizontalNavigationOn = autoNavigation || navigationMode === NavigationMode.Horizontal;
		this.verticalNavigationOn = autoNavigation || navigationMode === NavigationMode.Vertical;

		this.pageSize = options.pageSize;

		this.rootWebComponent = rootWebComponent;
		this.rootWebComponent.addEventListener("keydown", this.onkeydown.bind(this));
		this.rootWebComponent._onComponentStateFinalized = () => {
			this._init();
		};
	}

	_init() {
		this._getItems().forEach((item, idx) => {
			item._tabIndex = (idx === this.currentIndex) ? "0" : "-1";
		});
	}

	_horizontalNavigationOn() {
		return this.horizontalNavigationOn;
	}

	_verticalNavigationOn() {
		return this.verticalNavigationOn;
	}

	async _onKeyPress(event) {
		if (this.currentIndex >= this._getItems().length) {
			this.onOverflowBottomEdge();
		} else if (this.currentIndex < 0) {
			this.onOverflowTopEdge();
		}

		event.preventDefault();

		await RenderScheduler.whenFinished();

		this.update();
		this.focusCurrent();
	}

	onkeydown(event) {
		if (isUp(event) && this._verticalNavigationOn()) {
			return this._handleUp(event);
		}

		if (isDown(event) && this._verticalNavigationOn()) {
			return this._handleDown(event);
		}

		if (isLeft(event) && this._horizontalNavigationOn()) {
			return this._handleLeft(event);
		}

		if (isRight(event) && this._horizontalNavigationOn()) {
			return this._handleRight(event);
		}

		if (isHome(event)) {
			return this._handleHome(event);
		}

		if (isEnd(event)) {
			return this._handleEnd(event);
		}
	}

	_handleUp(event) {
		if (this._canNavigate()) {
			this.currentIndex -= this.rowSize;
			this._onKeyPress(event);
		}
	}

	_handleDown(event) {
		if (this._canNavigate()) {
			this.currentIndex += this.rowSize;
			this._onKeyPress(event);
		}
	}

	_handleLeft(event) {
		if (this._canNavigate()) {
			this.currentIndex -= 1;
			this._onKeyPress(event);
		}
	}

	_handleRight(event) {
		if (this._canNavigate()) {
			this.currentIndex += 1;
			this._onKeyPress(event);
		}
	}

	_handleHome(event) {
		if (this._canNavigate()) {
			const homeEndRange = this.rowSize > 1 ? this.rowSize : this._getItems().length;
			this.currentIndex -= this.currentIndex % homeEndRange;
			this._onKeyPress(event);
		}
	}

	_handleEnd(event) {
		if (this._canNavigate()) {
			const homeEndRange = this.rowSize > 1 ? this.rowSize : this._getItems().length;
			this.currentIndex += (homeEndRange - 1 - this.currentIndex % homeEndRange); // eslint-disable-line
			this._onKeyPress(event);
		}
	}

	update(current) {
		const origItems = this._getItems();

		if (current) {
			this.currentIndex = this._getItems().indexOf(current);
		}

		if (!origItems[this.currentIndex]
			|| (origItems[this.currentIndex]._tabIndex && origItems[this.currentIndex]._tabIndex === "0")) {
			return;
		}

		const items = origItems.slice(0);

		for (let i = 0; i < items.length; i++) {
			items[i]._tabIndex = (i === this.currentIndex ? "0" : "-1");
		}


		this.rootWebComponent._invalidate();
	}

	focusCurrent() {
		const currentItem = this._getCurrentItem();
		if (currentItem) {
			currentItem.focus();
		}
	}

	_canNavigate() {
		const currentItem = this._getCurrentItem();

		let activeElement = document.activeElement;

		while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
			activeElement = activeElement.shadowRoot.activeElement;
		}

		return currentItem && currentItem === activeElement;
	}

	_getCurrentItem() {
		const items = this._getItems();

		if (!items.length) {
			return null;
		}

		// normalize the index
		while (this.currentIndex >= items.length) {
			this.currentIndex -= this.rowSize;
		}

		if (this.currentIndex < 0) {
			this.currentIndex = 0;
		}

		const currentItem = items[this.currentIndex];

		if (!currentItem) {
			return;
		}

		if (currentItem.isUI5Element) {
			return currentItem.getFocusDomRef();
		}

		if (!this.rootWebComponent.getDomRef()) {
			return;
		}

		return this.rootWebComponent.getDomRef().querySelector(`#${currentItem.id}`);
	}

	set getItemsCallback(fn) {
		this._getItems = fn;
	}

	set current(val) {
		this.currentIndex = val;
	}

	onOverflowBottomEdge() {
		const items = this._getItems();
		const offset = this.currentIndex - items.length;

		if (this.behavior === ItemNavigationBehavior.Cyclic) {
			this.currentIndex = 0;
			return;
		}

		if (this.behavior === ItemNavigationBehavior.Paging) {
			this._handleNextPage();
		} else {
			this.currentIndex = items.length - 1;
		}

		this.fireEvent(ItemNavigation.BORDER_REACH, { start: false, end: true, offset });
	}

	onOverflowTopEdge() {
		const items = this._getItems();
		const offset = this.currentIndex + this.rowSize;

		if (this.behavior === ItemNavigationBehavior.Cyclic) {
			this.currentIndex = items.length - 1;
			return;
		}

		if (this.behavior === ItemNavigationBehavior.Paging) {
			this._handlePrevPage();
		} else {
			this.currentIndex = 0;
		}

		this.fireEvent(ItemNavigation.BORDER_REACH, { start: true, end: false, offset });
	}

	_handleNextPage() {
		this.fireEvent(ItemNavigation.PAGE_BOTTOM);
		const items = this._getItems();

		if (!this.hasNextPage) {
			this.currentIndex = items.length - 1;
		} else {
			this.currentIndex -= this.pageSize;
		}
	}

	_handlePrevPage() {
		this.fireEvent(ItemNavigation.PAGE_TOP);

		if (!this.hasPrevPage) {
			this.currentIndex = 0;
		} else {
			this.currentIndex = this.pageSize + this.currentIndex;
		}
	}
}

ItemNavigation.PAGE_TOP = "PageTop";
ItemNavigation.PAGE_BOTTOM = "PageBottom";
ItemNavigation.BORDER_REACH = "_borderReach";

const calculateWeekNumber = (confFirstDayOfWeek, oDate, iYear, oLocale, oLocaleData) => {
	let iWeekNum = 0;
	let iWeekDay = 0;
	const iFirstDayOfWeek = Number.isInteger(confFirstDayOfWeek) ? confFirstDayOfWeek : oLocaleData.getFirstDayOfWeek();

	// search Locale for containing "en-US", since sometimes
	// when any user settings have been defined, subtag "sapufmt" is added to the locale name
	// this is described inside sap.ui.core.Configuration file
	if (oLocale && (oLocale.getLanguage() === "en" && oLocale.getRegion() === "US")) {
		/*
			* in US the week starts with Sunday
			* The first week of the year starts with January 1st. But Dec. 31 is still in the last year
			* So the week beginning in December and ending in January has 2 week numbers
			*/
		const oJanFirst = new UniversalDate(oDate.getTime());
		oJanFirst.setUTCFullYear(iYear, 0, 1);
		iWeekDay = oJanFirst.getUTCDay();

		// get the date for the same weekday like jan 1.
		const oCheckDate = new UniversalDate(oDate.getTime());
		oCheckDate.setUTCDate(oCheckDate.getUTCDate() - oCheckDate.getUTCDay() + iWeekDay);

		iWeekNum = Math.round((oCheckDate.getTime() - oJanFirst.getTime()) / 86400000 / 7) + 1;
	} else {
		// normally the first week of the year is the one where the first Thursday of the year is
		// find Thursday of this week
		// if the checked day is before the 1. day of the week use a day of the previous week to check
		const oThursday = new UniversalDate(oDate.getTime());
		oThursday.setUTCDate(oThursday.getUTCDate() - iFirstDayOfWeek);
		iWeekDay = oThursday.getUTCDay();
		oThursday.setUTCDate(oThursday.getUTCDate() - iWeekDay + 4);

		const oFirstDayOfYear = new UniversalDate(oThursday.getTime());
		oFirstDayOfYear.setUTCMonth(0, 1);
		iWeekDay = oFirstDayOfYear.getUTCDay();
		let iAddDays = 0;
		if (iWeekDay > 4) {
			iAddDays = 7; // first day of year is after Thursday, so first Thursday is in the next week
		}
		const oFirstThursday = new UniversalDate(oFirstDayOfYear.getTime());
		oFirstThursday.setUTCDate(1 - iWeekDay + 4 + iAddDays);

		iWeekNum = Math.round((oThursday.getTime() - oFirstThursday.getTime()) / 86400000 / 7) + 1;
	}

	return iWeekNum;
};

const block0$9 = (context) => { return html`<div class="ui5-dp-root" style="${styleMap(context.styles.wrapper)}" @keydown=${context._onkeydown} @mousedown=${context._onmousedown} @mouseup=${context._onmouseup}>${ !context._hideWeekNumbers ? block1$6(context) : undefined }<div id="${ifDefined(context._id)}-content" class="ui5-dp-content"><div role="row" class="ui5-dp-days-names-container">${ repeat(context._dayNames, (item, index) => item._id || index, (item, index) => block3$4(item)) }</div><div id="${ifDefined(context._id)}-days" class="ui5-dp-items-container" tabindex="-1">${ repeat(context._weeks, (item, index) => item._id || index, (item, index) => block4$3(item, index, context)) }</div></div></div>`; };
const block1$6 = (context) => { return html`<div class="ui5-dp-weeknumber-container">${ repeat(context._weekNumbers, (item, index) => item._id || index, (item, index) => block2$5(item)) }</div>`; };
const block2$5 = (item, index, context) => { return html`<div class="ui5-dp-weekname-container"><span class="ui5-dp-weekname">${ifDefined(item)}</span></div>`; };
const block3$4 = (item, index, context) => { return html`<div id=${ifDefined(item.id)} role="columnheader" aria-label="${ifDefined(item.name)}" class="${ifDefined(item.classes)}">${ifDefined(item.ultraShortName)}</div>`; };
const block4$3 = (item, index, context) => { return html`${ item.length ? block5$3(item, index, context) : block7$1() }`; };
const block5$3 = (item, index, context) => { return html`<div style="display: flex;" @mouseover="${context._onitemmouseover}" @keydown="${context._onitemkeydown}">${ repeat(item, (item, index) => item._id || index, (item, index) => block6$2(item)) }</div>`; };
const block6$2 = (item, index, context) => { return html`<div id="${ifDefined(item.id)}" tabindex="${ifDefined(item._tabIndex)}" data-sap-timestamp="${ifDefined(item.timestamp)}" data-sap-index="${ifDefined(item._index)}" role="gridcell" aria-selected="${ifDefined(item.selected)}" class="${ifDefined(item.classes)}"><span class="ui5-dp-daytext" data-sap-timestamp="${ifDefined(item.timestamp)}" data-sap-index="${ifDefined(item._index)}">${ifDefined(item.iDay)}</span></div>`; };
const block7$1 = (item, index, context) => { return html`<div class="sapWCEmptyWeek"></div>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var dayPickerCSS = ":host(:not([hidden])){display:inline-block}:host{height:100%;width:100%}:host([_hide-week-numbers]) .ui5-dp-content{flex-basis:100%}.ui5-dp-dayname,.ui5-dp-item,.ui5-dp-weekname{width:var(--_ui5_day_picker_item_width);height:var(--_ui5_day_picker_item_height);margin-top:var(--_ui5_daypicker_item_margin);margin-right:var(--_ui5_daypicker_item_margin);font-family:var(--sapFontFamily);border-radius:var(--_ui5_daypicker_item_border_radius)}.ui5-dp-weekname{color:var(--_ui5_daypicker_weekname_color)}.ui5-dp-content{display:flex;flex-basis:87.5%;flex-direction:column;font-family:var(--sapFontFamily)}.ui5-dp-days-names-container{display:flex;height:var(--_ui5_daypicker_daynames_container_height)}.ui5-dp-weeknumber-container{padding-top:var(--_ui5_daypicker_weeknumbers_container_padding_top);flex-basis:12.5%}.ui5-dp-dayname,.ui5-dp-item,.ui5-dp-weekname,.ui5-dp-weekname-container{display:flex;flex-grow:1;justify-content:center;align-items:center;font-size:var(--sapFontSmallSize);outline:none;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui5-dp-item{position:relative;color:var(--sapTextColor);background:var(--sapLegend_WorkingBackground);font-size:var(--sapFontSize);border:var(--_ui5_daypicker_item_border)}.ui5-dp-item:hover{background:var(--sapList_Hover_Background)}.ui5-dp-daytext{display:flex;width:100%;height:100%;justify-content:center;align-items:center;box-sizing:border-box}.ui5-dp-dayname{color:var(--_ui5_daypicker_dayname_color);height:100%}.ui5-dp-item.ui5-dp-item--weeekend{background:var(--sapLegend_NonWorkingBackground)}.ui5-dp-item.ui5-dp-item--disabled{pointer-events:none;opacity:.5}.ui5-dp-item.ui5-dp-item--weeekend:hover{background:var(--sapList_Hover_Background)}.ui5-dp-item.ui5-dp-item--othermonth{color:var(--_ui5_daypicker_item_othermonth_color);background:var(--_ui5_daypicker_item_othermonth_background_color);border-color:transparent}.ui5-dp-item.ui5-dp-item--othermonth:hover,.ui5-dp-item.ui5-dp-item--weeekend.ui5-dp-item--othermonth:hover{color:var(--_ui5_daypicker_item_othermonth_hover_color);background:var(--sapList_Hover_Background)}.ui5-dp-item:focus:after{content:\"\";width:calc(100% - .25rem);height:calc(100% - .25rem);border:var(--_ui5_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);position:absolute;top:var(--_ui5_daypicker_item_outline_offset);left:var(--_ui5_daypicker_item_outline_offset)}.ui5-dp-item.ui5-dp-item--selected .ui5-dp-daytext{background:var(--sapContent_Selected_Background);color:var(--sapContent_Selected_TextColor)}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--now .ui5-dp-daytext{border:1px solid var(--sapList_Background);border-radius:var(--_ui5_daypicker_item_now_inner_border_radius)}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--now:focus:after{width:var(--_ui5_daypicker_item_now_selected_focus_after_width);height:var(--_ui5_daypicker_item_now_selected_focus_after_height);border-color:var(--sapContent_FocusColor);top:0;left:0}.ui5-dp-item.ui5-dp-item--selected:hover{background:var(--_ui5_daypicker_item_selected_hover_background_color);color:var(--sapContent_ContrastTextColor)}.ui5-dp-item.ui5-dp-item--selected:focus:after{border-color:var(--sapContent_ContrastFocusColor)}.ui5-dp-items-container{outline:none}.ui5-dp-item.ui5-dp-item--selected-between .ui5-dp-daytext,.ui5-dp-item[hovered] .ui5-dp-daytext{background-color:var(--sapList_SelectionBackgroundColor);color:var(--sapTextColor)}.ui5-dp-item.ui5-dp-item--selected-between,.ui5-dp-item[hovered]{border:1px solid var(--sapContent_Selected_Background);border-radius:5%}.ui5-dp-item.ui5-dp-item--now{border:.125rem solid var(--sapLegend_CurrentDateTime)}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--selected-between:focus:after{border-color:var(--sapContent_FocusColor)}.ui5-dp-items-container>:first-child{justify-content:flex-end}.ui5-dp-emptyweek{height:var(--_ui5_day_picker_empty_height)}";

const monthDiff = (startDate, endDate) => {
	let months;
	const _startDate = CalendarDate.fromTimestamp(startDate).toLocalJSDate(),
		_endDate = CalendarDate.fromTimestamp(endDate).toLocalJSDate();

	months = (_endDate.getFullYear() - _startDate.getFullYear()) * 12;
	months -= _startDate.getMonth();
	months += _endDate.getMonth();
	return months;
};

/**
 * @public
 */
const metadata$9 = {
	tag: "ui5-daypicker",
	properties: /** @lends  sap.ui.webcomponents.main.DayPicker.prototype */ {
		/**
		 * A UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {number}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * Sets a calendar type used for display.
		 * If not set, the calendar type of the global configuration is used.
		 * @type {CalendarType}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Sets the selected dates as UTC timestamps.
		 * @type {Array}
		 * @public
		 */
		selectedDates: {
			type: Integer,
			multiple: true,
		},

		/**
		 * Determines the minimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
		},

		/**
		 * Determines the format, displayed in the input field.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		formatPattern: {
			type: String,
		},

		/**
		 * Defines the visibility of the week numbers column.
		 * <br><br>
		 *
		 * <b>Note:<b> For calendars other than Gregorian,
		 * the week numbers are not displayed regardless of what is set.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		hideWeekNumbers: {
			type: Boolean,
		},

		/**
		 * Defines the effective weeks numbers visibility,
		 * based on the <code>primaryCalendarType</code> and <code>hideWeekNumbers</code> property.
		 * @type {boolean}
		 * @private
		 */
		_hideWeekNumbers: {
			type: Boolean,
		},

		/**
		 * @type {Object}
		 * @private
		 */
		_weeks: {
			type: Object,
			multiple: true,
		},

		/**
		 * @type {Object}
		 * @private
		 */
		_weekNumbers: {
			type: Object,
			multiple: true,
		},

		/**
		 * @type {boolean}
		 * @private
		 */
		_hidden: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.DayPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		change: {},
		/**
		 * Fired when month, year has changed due to item navigation.
		 * @public
		 * @event
		 */
		navigate: {},
	},
};

const DEFAULT_MAX_YEAR = 9999;
const DEFAULT_MIN_YEAR = 1;

/**
 * @class
 *
 * Represents one month view inside a calendar.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DayPicker
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-daypicker
 * @public
 */
class DayPicker extends UI5Element {
	static get metadata() {
		return metadata$9;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$9;
	}

	static get styles() {
		return dayPickerCSS;
	}

	constructor() {
		super();
		this._oLocale = getLocale();
		this._oLocaleData = new LocaleData(this._oLocale);

		this._itemNav = new ItemNavigation(this, {
			rowSize: 7,
			pageSize: 42,
			behavior: ItemNavigationBehavior.Paging,
		});

		this._itemNav.getItemsCallback = function getItemsCallback() {
			return this.focusableDays;
		}.bind(this);

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);

		this._itemNav.attachEvent(
			"PageBottom",
			this._handleMonthBottomOverflow.bind(this)
		);

		this._itemNav.attachEvent(
			"PageTop",
			this._handleMonthTopOverflow.bind(this)
		);
	}

	onBeforeRendering() {
		let oCalDate,
			day,
			timestamp,
			lastWeekNumber = -1,
			isDaySelected = false,
			todayIndex = 0;
		const _aVisibleDays = this._getVisibleDays(this._calendarDate);
		this._weeks = [];
		let week = [];
		this._weekNumbers = [];
		let weekday;
		if (this.minDate) {
			this._minDateObject = new Date(this._minDate);
		}

		if (this.maxDate) {
			this._maxDateObject = new Date(this._maxDate);
		}
		/* eslint-disable no-loop-func */
		for (let i = 0; i < _aVisibleDays.length; i++) {
			oCalDate = _aVisibleDays[i];
			timestamp = oCalDate.valueOf() / 1000; // no need to round because CalendarDate does it

			// day of the week
			weekday = oCalDate.getDay() - this._getFirstDayOfWeek();
			if (weekday < 0) {
				weekday += 7;
			}
			day = {
				timestamp: timestamp.toString(),
				selected: this._selectedDates.some(d => {
					return d === timestamp;
				}),
				selectedBetween: this._selectedDates.slice(1, this._selectedDates.length - 1).some(d => {
					return d === timestamp;
				}),
				iDay: oCalDate.getDate(),
				_index: i.toString(),
				classes: `ui5-dp-item ui5-dp-wday${weekday}`,
			};

			const weekNumber = calculateWeekNumber(getFirstDayOfWeek(), oCalDate.toUTCJSDate(), oCalDate.getYear(), this._oLocale, this._oLocaleData);

			if (lastWeekNumber !== weekNumber) {
				this._weekNumbers.push(weekNumber);

				lastWeekNumber = weekNumber;
			}

			const isToday = oCalDate.isSame(CalendarDate.fromLocalJSDate(new Date(), this._primaryCalendarType));

			week.push(day);

			if (oCalDate.getDay() === this._getFirstDayOfWeek()) {
				day.classes += " ui5-dp-firstday";
			}

			if (day.selected) {
				day.classes += " ui5-dp-item--selected";
				isDaySelected = true;
			}

			if (day.selectedBetween) {
				day.classes += " ui5-dp-item--selected-between";
			}

			if (isToday) {
				day.classes += " ui5-dp-item--now";
				todayIndex = i;
			}

			if (oCalDate.getMonth() !== this._month) {
				day.classes += " ui5-dp-item--othermonth";
			}

			day.id = `${this._id}-${timestamp}`;

			if (this._isWeekend(oCalDate)) {
				day.classes += " ui5-dp-item--weeekend";
			}
			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(oCalDate)) {
				day.classes += " ui5-dp-item--disabled";
				day.disabled = true;
			}

			if (day.classes.indexOf("ui5-dp-wday6") !== -1
				|| _aVisibleDays.length - 1 === i) {
				this._weeks.push(week);
				week = [];
			}
		}
		while (this._weeks.length < 6) {
			this._weeks.push([]);
		}
		/* eslint-enable no-loop-func */

		if (!isDaySelected && todayIndex && this._itemNav.current === 0) {
			this._itemNav.current = todayIndex;
		}

		const aDayNamesWide = this._oLocaleData.getDays("wide", this._primaryCalendarType);
		const aDayNamesAbbreviated = this._oLocaleData.getDays("abbreviated", this._primaryCalendarType);
		const aUltraShortNames = aDayNamesAbbreviated.map(n => n);
		let dayName;

		this._dayNames = [];
		for (let i = 0; i < 7; i++) {
			weekday = i + this._getFirstDayOfWeek();
			if (weekday > 6) {
				weekday -= 7;
			}
			dayName = {
				id: `${this._id}-WH${i.toString()}`,
				name: aDayNamesWide[weekday],
				ultraShortName: aUltraShortNames[weekday],
				classes: "ui5-dp-dayname",
			};

			this._dayNames.push(dayName);
		}

		this._dayNames[0].classes += " ui5-dp-firstday";
		this._hideWeekNumbers = this.shouldHideWeekNumbers;
	}

	onAfterRendering() {
		if (this.selectedDates.length === 1) {
			this.fireEvent("daypickerrendered", { focusedItemIndex: this._itemNav.currentIndex });
		}
	}

	_onmousedown(event) {
		const target = event.target;
		const dayPressed = this._isDayPressed(target);

		if (dayPressed) {
			const targetDate = parseInt(target.getAttribute("data-sap-timestamp"));

			// findIndex, give it to item navigation
			for (let i = 0; i < this._weeks.length; i++) {
				for (let j = 0; j < this._weeks[i].length; j++) {
					if (parseInt(this._weeks[i][j].timestamp) === targetDate) {
						let index = parseInt(target.getAttribute("data-sap-index"));
						if (this.minDate || this.maxDate) {
							const focusableItem = this.focusableDays.find(item => parseInt(item._index) === index);
							index = focusableItem ? this.focusableDays.indexOf(focusableItem) : index;
						}

						this._itemNav.current = index;
						this._itemNav.update();
						break;
					}
				}
			}

			this.targetDate = targetDate;
		}
	}

	_onmouseup(event) {
		const dayPressed = this._isDayPressed(event.target);
		if (this.targetDate) {
			this._modifySelectionAndNotifySubscribers(this.targetDate, event.ctrlKey);
			this.targetDate = null;
		}

		if (!dayPressed) {
			this._itemNav.focusCurrent();
		}
	}

	_onitemmouseover(event) {
		if (this.selectedDates.length === 1) {
			this.fireEvent("item-mouseover", event);
		}
	}

	_onitemkeydown(event) {
		if (this.selectedDates.length === 1) {
			this.fireEvent("item-keydown", event);
		}
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}
	}

	_handleEnter(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-dp-item") > -1) {
			const targetDate = parseInt(event.target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate, event.ctrlKey);
		}
	}

	_handleSpace(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-dp-item") > -1) {
			const targetDate = parseInt(event.target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate, event.ctrlKey);
		}
	}

	get shouldHideWeekNumbers() {
		if (this._primaryCalendarType !== CalendarType.Gregorian) {
			return true;
		}

		return this.hideWeekNumbers;
	}

	get _timestamp() {
		return this.timestamp !== undefined ? this.timestamp : Math.floor(new Date().getTime() / 1000);
	}

	get _localDate() {
		return new Date(this._timestamp * 1000);
	}

	get _calendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _month() {
		return this._calendarDate.getMonth();
	}

	get _year() {
		return this._calendarDate.getYear();
	}

	get _currentCalendarDate() {
		return CalendarDate.fromTimestamp(new Date().getTime(), this._primaryCalendarType);
	}

	get _selectedDates() {
		return this.selectedDates || [];
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType$1() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get focusableDays() {
		const focusableDays = [];

		for (let i = 0; i < this._weeks.length; i++) {
			const week = this._weeks[i].filter(x => !x.disabled);
			focusableDays.push(week);
		}

		return [].concat(...focusableDays);
	}

	_modifySelectionAndNotifySubscribers(sNewDate, bAdd) {
		if (bAdd) {
			this.selectedDates = [...this._selectedDates, sNewDate];
		} else {
			this.selectedDates = [sNewDate];
		}

		this.fireEvent("change", { dates: [...this._selectedDates] });
	}

	_handleMonthBottomOverflow(event) {
		this._itemNav.hasNextPage = this._hasNextMonth();
	}

	_handleMonthTopOverflow(event) {
		this._itemNav.hasPrevPage = this._hasPrevMonth();
	}

	_hasNextMonth() {
		let newMonth = this._month + 1;
		let newYear = this._year;

		if (newMonth > 11) {
			newMonth = 0;
			newYear++;
		}

		if (newYear > DEFAULT_MAX_YEAR && newMonth === 0) {
			return false;
		}

		if (!this.maxDate) {
			return true;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setDate(oNewDate.getDate());
		oNewDate.setYear(newYear);
		oNewDate.setMonth(newMonth);

		const monthsBetween = monthDiff(oNewDate.valueOf(), this._maxDate);
		if (monthsBetween < 0) {
			return false;
		}

		const lastFocusableDay = this.focusableDays[this.focusableDays.length - 1].iDay;
		if (monthsBetween === 0 && CalendarDate.fromTimestamp(this._maxDate).toLocalJSDate().getDate() === lastFocusableDay) {
			return false;
		}

		return true;
	}

	_hasPrevMonth() {
		let newMonth = this._month - 1;
		let newYear = this._year;

		if (newMonth < 0) {
			newMonth = 11;
			newYear--;
		}

		if (newYear < DEFAULT_MIN_YEAR && newMonth === 11) {
			return false;
		}

		if (!this.minDate) {
			return true;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setDate(oNewDate.getDate());
		oNewDate.setYear(newYear);
		oNewDate.setMonth(newMonth);

		const monthsBetween = monthDiff(this._minDate, oNewDate.valueOf());
		if (this.minDate && monthsBetween < 0) {
			return false;
		}

		return true;
	}

	_handleItemNavigationBorderReach(event) {
		const currentMonth = this._month,
			currentYear = this._year;
		let newMonth,
			newYear,
			newDate,
			currentDate;

		if (event.end) {
			currentDate = new Date(this._weeks[this._weeks.length - 1][event.offset].timestamp * 1000);
			newMonth = currentMonth < 11 ? currentMonth + 1 : 0;
			newYear = currentMonth < 11 ? currentYear : currentYear + 1;
			newDate = currentDate.getMonth() === newMonth ? currentDate.getDate() : currentDate.getDate() + 7;
		} else if (event.start) {
			currentDate = new Date(this._weeks[0][event.offset].timestamp * 1000);
			newMonth = currentMonth > 0 ? currentMonth - 1 : 11;
			newYear = currentMonth > 0 ? currentYear : currentYear - 1;
			newDate = currentDate.getMonth() === newMonth ? currentDate.getDate() : currentDate.getDate() - 7;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setDate(newDate);
		oNewDate.setYear(newYear);
		oNewDate.setMonth(newMonth);

		if (oNewDate.getYear() < DEFAULT_MIN_YEAR || oNewDate.getYear() > DEFAULT_MAX_YEAR) {
			return;
		}

		if (this._isOutOfSelectableRange(oNewDate._oUDate.oDate)) {
			return;
		}

		this.fireEvent("navigate", { timestamp: (oNewDate.valueOf() / 1000) });
	}

	_isWeekend(oDate) {
		const iWeekDay = oDate.getDay(),
			iWeekendStart = this._oLocaleData.getWeekendStart(),
			iWeekendEnd = this._oLocaleData.getWeekendEnd();

		return (iWeekDay >= iWeekendStart && iWeekDay <= iWeekendEnd)
			|| (iWeekendEnd < iWeekendStart && (iWeekDay >= iWeekendStart || iWeekDay <= iWeekendEnd));
	}

	_isDayPressed(target) {
		const targetParent = target.parentNode;
		return (target.className.indexOf("ui5-dp-item") > -1) || (targetParent && target.parentNode.classList.contains("ui5-dp-item"));
	}

	_isOutOfSelectableRange(date) {
		const currentDate = date._oUDate ? date.toLocalJSDate() : CalendarDate.fromTimestamp(date).toLocalJSDate();

		return currentDate > this._maxDateObject || currentDate < this._minDateObject;
	}

	get _maxDate() {
		if (this.maxDate) {
			const jsDate = new Date(this.getFormat().parse(this.maxDate).getFullYear(), this.getFormat().parse(this.maxDate).getMonth(), this.getFormat().parse(this.maxDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			const jsDate = new Date(this.getFormat().parse(this.minDate).getFullYear(), this.getFormat().parse(this.minDate).getMonth(), this.getFormat().parse(this.minDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.minDate;
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	_getVisibleDays(oStartDate, bIncludeBCDates) {
		let oCalDate,
			iDaysOldMonth,
			iYear;

		const _aVisibleDays = [];

		// If date passed generate days for new start date else return the current one
		if (!oStartDate) {
			return _aVisibleDays;
		}

		const iFirstDayOfWeek = this._getFirstDayOfWeek();

		// determine weekday of first day in month
		const oFirstDay = new CalendarDate(oStartDate, this._primaryCalendarType);
		oFirstDay.setDate(1);
		iDaysOldMonth = oFirstDay.getDay() - iFirstDayOfWeek;
		if (iDaysOldMonth < 0) {
			iDaysOldMonth = 7 + iDaysOldMonth;
		}

		if (iDaysOldMonth > 0) {
			// determine first day for display
			oFirstDay.setDate(1 - iDaysOldMonth);
		}

		const oDay = new CalendarDate(oFirstDay);
		for (let i = 0; i < 42; i++) {
			iYear = oDay.getYear();
			oCalDate = new CalendarDate(oDay, this._primaryCalendarType);
			if (bIncludeBCDates && iYear < DEFAULT_MIN_YEAR) {
				// For dates before 0001-01-01 we should render only empty squares to keep
				// the month square matrix correct.
				oCalDate._bBeforeFirstYear = true;
				_aVisibleDays.push(oCalDate);
			} else if (iYear >= DEFAULT_MIN_YEAR && iYear <= DEFAULT_MAX_YEAR) {
				// Days before 0001-01-01 or after 9999-12-31 should not be rendered.
				_aVisibleDays.push(oCalDate);
			}
			oDay.setDate(oDay.getDate() + 1);
		}

		return _aVisibleDays;
	}

	_getFirstDayOfWeek() {
		const confFirstDayOfWeek = getFirstDayOfWeek();
		return Number.isInteger(confFirstDayOfWeek) ? confFirstDayOfWeek : this._oLocaleData.getFirstDayOfWeek();
	}

	get styles() {
		return {
			wrapper: {
				display: this._hidden ? "none" : "flex",
			},
			main: {
				width: "100%",
			},
		};
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);
	}
}

DayPicker.define();

const block0$a = (context) => { return html`<div class="ui5-mp-root" role="grid" aria-readonly="false" aria-multiselectable="false" style="${styleMap(context.styles.main)}" @keydown=${context._onkeydown} @click=${context._onclick}>${ repeat(context._quarters, (item, index) => item._id || index, (item, index) => block1$7(item)) }</div>`; };
const block1$7 = (item, index, context) => { return html`<div class="ui5-mp-quarter">${ repeat(item, (item, index) => item._id || index, (item, index) => block2$6(item)) }</div>`; };
const block2$6 = (item, index, context) => { return html`<div id="${ifDefined(item.id)}" data-sap-timestamp=${ifDefined(item.timestamp)} tabindex=${ifDefined(item._tabIndex)} class="${ifDefined(item.classes)}" role="gridcell" aria-selected="false">${ifDefined(item.name)}</div>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var styles$2 = ":host(:not([hidden])){display:inline-block}:host{width:100%;height:100%}.ui5-mp-root{padding:2rem 0 1rem 0;display:flex;flex-direction:column;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);justify-content:center;align-items:center}.ui5-mp-item{display:flex;width:calc(33.333% - .125rem);height:var(--_ui5_month_picker_item_height);color:var(--sapTextColor);background-color:var(--sapLegend_WorkingBackground);align-items:center;justify-content:center;margin:var(--_ui5_monthpicker_item_margin);box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;outline:none;position:relative;border:var(--_ui5_monthpicker_item_border);border-radius:var(--_ui5_monthpicker_item_border_radius)}.ui5-mp-item:hover{background-color:var(--sapList_Hover_Background)}.ui5-mp-item.ui5-mp-item--selected{background-color:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}.ui5-mp-item.ui5-mp-item--disabled{pointer-events:none;opacity:.5}.ui5-mp-item.ui5-mp-item--selected:focus{background-color:var(--sapContent_Selected_Background)}.ui5-mp-item.ui5-mp-item--selected:focus:after{border-color:var(--sapContent_ContrastFocusColor)}.ui5-mp-item.ui5-mp-item--selected:hover{background-color:var(--sapContent_Selected_Background)}.ui5-mp-item:focus:after{content:\"\";position:absolute;width:var(--_ui5_monthpicker_item_focus_after_width);height:var(--_ui5_monthpicker_item_focus_after_height);border:var(--_ui5_monthpicker_item_focus_after_border);top:var(--_ui5_monthpicker_item_focus_after_offset);left:var(--_ui5_monthpicker_item_focus_after_offset)}.ui5-mp-quarter{display:flex;justify-content:center;align-items:center;width:100%}";

/**
 * @public
 */
const metadata$a = {
	tag: "ui5-monthpicker",
	properties: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		/**
		 * A UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {Integer}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * Sets a calendar type used for display.
		 * If not set, the calendar type of the global configuration is used.
		 * @type {CalendarType}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Determines the мinimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
		},

		_quarters: {
			type: Object,
			multiple: true,
		},

		_hidden: {
			type: Boolean,
			noAttribute: true,
		},
		/**
		 * Determines the format, displayed in the input field.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		formatPattern: {
			type: String,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		change: {},
	},
};

/**
 * Month picker component.
 *
 * @class
 *
 * Displays months which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MonthPicker
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-monthpicker
 * @public
 */
class MonthPicker extends UI5Element {
	static get metadata() {
		return metadata$a;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$a;
	}

	static get styles() {
		return styles$2;
	}

	constructor() {
		super();
		this._oLocale = getLocale();
		this._oLocaleData = new LocaleData(this._oLocale);

		this._itemNav = new ItemNavigation(this, {
			pageSize: 12,
			rowSize: 3,
			behavior: ItemNavigationBehavior.Paging,
		});

		this._itemNav.getItemsCallback = function getItemsCallback() {
			const focusableMonths = [];

			for (let i = 0; i < this._quarters.length; i++) {
				const quarter = this._quarters[i].filter(x => !x.disabled);
				focusableMonths.push(quarter);
			}

			return [].concat(...focusableMonths);
		}.bind(this);
		this._itemNav.setItemsCallback = function setItemsCallback(items) {
			this._quarters = items;
		}.bind(this);
	}

	onBeforeRendering() {
		const quarters = [];
		const oCalDate = CalendarDate.fromTimestamp(new Date().getTime(), this._primaryCalendarType);
		let timestamp;

		for (let i = 0; i < 12; i++) {
			oCalDate.setMonth(i);
			timestamp = oCalDate.valueOf() / 1000;

			const month = {
				timestamp: timestamp.toString(),
				id: `${this._id}-m${i}`,
				name: this._oLocaleData.getMonths("wide", this._primaryCalendarType)[i],
				classes: "ui5-mp-item",
			};

			if (this._month === i) {
				month.classes += " ui5-mp-item--selected";
			}

			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(i)) {
				month.classes += " ui5-mp-item--disabled";
				month.disabled = true;
			}

			const quarterIndex = parseInt(i / 3);

			if (quarters[quarterIndex]) {
				quarters[quarterIndex].push(month);
			} else {
				quarters[quarterIndex] = [month];
			}
		}

		this._quarters = quarters;
	}

	onAfterRendering() {
		this._itemNav.focusCurrent();
	}

	get _timestamp() {
		return this.timestamp !== undefined ? this.timestamp : Math.floor(new Date().getTime() / 1000);
	}

	get _localDate() {
		return new Date(this._timestamp * 1000);
	}

	get _calendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	get _month() {
		return this._calendarDate.getMonth();
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType$1() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	_onclick(event) {
		if (event.target.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this.getTimestampFromDOM(event.target);
			this.timestamp = timestamp;
			this._itemNav.current = this._month;
			this.fireEvent("change", { timestamp });
		}
	}

	_onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			this._activateMonth(event);
		}
	}

	_activateMonth(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this.getTimestampFromDOM(event.target);
			this.timestamp = timestamp;
			this.fireEvent("change", { timestamp });
		}
	}

	_isOutOfSelectableRange(monthIndex) {
		const currentDateYear = this._localDate.getFullYear(),
			minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && ((currentDateYear === minDate.getFullYear() && monthIndex < minDate.getMonth()) || currentDateYear < minDate.getFullYear()),
			maxDateCheck = maxDate && ((currentDateYear === maxDate.getFullYear() && monthIndex > maxDate.getMonth()) || (currentDateYear > maxDate.getFullYear()));

		return maxDateCheck || minDateCheck;
	}

	get _maxDate() {
		if (this.maxDate) {
			const jsDate = new Date(this.getFormat().parse(this.maxDate).getFullYear(), this.getFormat().parse(this.maxDate).getMonth(), this.getFormat().parse(this.maxDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			const jsDate = new Date(this.getFormat().parse(this.minDate).getFullYear(), this.getFormat().parse(this.minDate).getMonth(), this.getFormat().parse(this.minDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.minDate;
	}


	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	getTimestampFromDOM(domNode) {
		const oMonthDomRef = domNode.getAttribute("data-sap-timestamp");
		return parseInt(oMonthDomRef);
	}

	get styles() {
		return {
			main: {
				display: this._hidden ? "none" : "",
			},
		};
	}
}

MonthPicker.define();

const block0$b = (context) => { return html`<div class="ui5-yp-root" role="grid" aria-readonly="false" aria-multiselectable="false" style="${styleMap(context.styles.main)}" @keydown=${context._onkeydown} @click=${context._onclick}>${ repeat(context._yearIntervals, (item, index) => item._id || index, (item, index) => block1$8(item)) }</div>`; };
const block1$8 = (item, index, context) => { return html`<div class="ui5-yp-interval-container">${ repeat(item, (item, index) => item._id || index, (item, index) => block2$7(item)) }</div>`; };
const block2$7 = (item, index, context) => { return html`<div id="${ifDefined(item.id)}" tabindex="${ifDefined(item._tabIndex)}" data-sap-timestamp="${ifDefined(item.timestamp)}" class="${ifDefined(item.classes)}" role="gridcell" aria-selected="false">${ifDefined(item.year)}</div>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var styles$3 = ":host(:not([hidden])){display:inline-block}:host{width:100%;height:100%}.ui5-yp-root{padding:2rem 0 1rem 0;display:flex;flex-direction:column;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);justify-content:center;align-items:center}.ui5-yp-interval-container{display:flex;justify-content:center;align-items:center;width:100%}.ui5-yp-item{display:flex;margin:var(--_ui5_yearpicker_item_margin);width:calc(25% - .125rem);height:var(--_ui5_year_picker_item_height);color:var(--sapTextColor);background-color:var(--sapLegend_WorkingBackground);align-items:center;justify-content:center;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;outline:none;position:relative;border:var(--_ui5_yearpicker_item_border);border-radius:var(--_ui5_yearpicker_item_border_radius)}.ui5-yp-item:hover{background-color:var(--sapList_Hover_Background)}.ui5-yp-item.ui5-yp-item--selected{background-color:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}.ui5-yp-item.ui5-yp-item--disabled{pointer-events:none;opacity:.5}.ui5-yp-item.ui5-yp-item--selected:focus{background-color:var(--_ui5_yearpicker_item_selected_focus)}.ui5-yp-item.ui5-yp-item--selected:focus:after{border-color:var(--sapContent_ContrastFocusColor)}.ui5-yp-item.ui5-yp-item--selected:hover{background-color:var(--_ui5_yearpicker_item_selected_focus)}.ui5-yp-item:focus:after{content:\"\";position:absolute;width:var(--_ui5_yearpicker_item_focus_after_width);height:var(--_ui5_yearpicker_item_focus_after_height);border:var(--_ui5_yearpicker_item_focus_after_border);top:var(--_ui5_yearpicker_item_focus_after_offset);left:var(--_ui5_yearpicker_item_focus_after_offset)}";

/**
 * @public
 */
const metadata$b = {
	tag: "ui5-yearpicker",
	properties: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * A UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {Integer}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * Sets a calendar type used for display.
		 * If not set, the calendar type of the global configuration is used.
		 * @type {CalendarType}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Determines the мinimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
			defaultValue: undefined,
		},

		_selectedYear: {
			type: Integer,
			noAttribute: true,
		},

		_yearIntervals: {
			type: Object,
			multiple: true,
		},

		_hidden: {
			type: Boolean,
			noAttribute: true,
		},
		/**
		* Determines the format, displayed in the input field.
		*
		* @type {string}
		* @defaultvalue ""
		* @public
		*/
	   formatPattern: {
		   type: String,
	   },
	},
	events: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		change: {},
	},
};

/**
 * @class
 *
 * Displays years which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.YearPicker
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-yearpicker
 * @public
 */
class YearPicker extends UI5Element {
	static get metadata() {
		return metadata$b;
	}

	static get styles() {
		return styles$3;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$b;
	}

	constructor() {
		super();

		this._oLocale = getLocale();

		this._itemNav = new ItemNavigation(this, {
			pageSize: 20,
			rowSize: 4,
			behavior: ItemNavigationBehavior.Paging,
		});

		this._itemNav.getItemsCallback = function getItemsCallback() {
			const focusableYears = [];

			for (let i = 0; i < this._yearIntervals.length; i++) {
				const yearInterval = this._yearIntervals[i].filter(x => !x.disabled);
				focusableYears.push(yearInterval);
			}

			return [].concat(...focusableYears);
		}.bind(this);

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);

		this._yearIntervals = [];
	}

	onBeforeRendering() {
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, this._oLocale);
		const oCalDate = this._calendarDate;
		oCalDate.setMonth(0);
		oCalDate.setDate(1);
		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 > YearPicker._MAX_YEAR - YearPicker._ITEMS_COUNT) {
			oCalDate.setYear(YearPicker._MAX_YEAR - YearPicker._ITEMS_COUNT);
		} else if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 < YearPicker._MIN_YEAR) {
			oCalDate.setYear(YearPicker._MIN_YEAR - 1);
		} else {
			oCalDate.setYear(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1);
		}

		const intervals = [];
		let timestamp;

		if (this._selectedYear === undefined) {
			this._selectedYear = this._year;
		}

		for (let i = 0; i < YearPicker._ITEMS_COUNT; i++) {
			const intervalIndex = parseInt(i / 4);
			if (!intervals[intervalIndex]) {
				intervals[intervalIndex] = [];
			}

			oCalDate.setYear(oCalDate.getYear() + 1);

			timestamp = oCalDate.valueOf() / 1000;

			const year = {
				timestamp: timestamp.toString(),
				id: `${this._id}-y${timestamp}`,
				year: oYearFormat.format(oCalDate.toLocalJSDate()),
				classes: "ui5-yp-item",
			};

			if (oCalDate.getYear() === this._selectedYear) {
				year.classes += " ui5-yp-item--selected";
			}

			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(oCalDate.getYear())) {
				year.classes += " ui5-yp-item--disabled";
				year.disabled = true;
			}

			if (intervals[intervalIndex]) {
				intervals[intervalIndex].push(year);
			}
		}

		this._yearIntervals = intervals;
	}

	onAfterRendering() {
		this._itemNav.focusCurrent();
	}

	get _timestamp() {
		return this.timestamp !== undefined ? this.timestamp : Math.floor(new Date().getTime() / 1000);
	}

	get _localDate() {
		return new Date(this._timestamp * 1000);
	}

	get _calendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	get _year() {
		return this._calendarDate.getYear();
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType$1() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	_onclick(event) {
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);
			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
			this.fireEvent("change", { timestamp });
		}
	}

	getTimestampFromDom(domNode) {
		const sTimestamp = domNode.getAttribute("data-sap-timestamp");
		return parseInt(sTimestamp);
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}
	}

	_handleEnter(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);

			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
			this.fireEvent("change", { timestamp });
		}
	}

	_handleSpace(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);

			this._selectedYear = CalendarDate.fromTimestamp(
				timestamp * 1000,
				this._primaryCalendarType
			).getYear();
		}
	}

	_handleItemNavigationBorderReach(event) {
		const oCalDate = this._calendarDate;
		oCalDate.setMonth(0);
		oCalDate.setDate(1);

		if (event.end) {
			oCalDate.setYear(oCalDate.getYear() + YearPicker._ITEMS_COUNT);
		} else if (event.start) {
			if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX < YearPicker._MIN_YEAR) {
				return;
			}
			oCalDate.setYear(oCalDate.getYear() - YearPicker._ITEMS_COUNT);
		}

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX > YearPicker._MAX_YEAR) {
			return;
		}

		if (this._isOutOfSelectableRange(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX)
		&& this._isOutOfSelectableRange(oCalDate.getYear() + YearPicker._MIDDLE_ITEM_INDEX)) {
			return;
		}

		if (this._isOutOfSelectableRange(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX)
		&& this._isOutOfSelectableRange(oCalDate.getYear() + YearPicker._MIDDLE_ITEM_INDEX)) {
			return;
		}

		this.timestamp = oCalDate.valueOf() / 1000;
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	_isOutOfSelectableRange(year) {
		const minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && year < minDate.getFullYear(),
			maxDateCheck = maxDate && year > maxDate.getFullYear();

		return minDateCheck || maxDateCheck;
	}

	get _maxDate() {
		if (this.maxDate) {
			const jsDate = new Date(this.getFormat().parse(this.maxDate).getFullYear(), this.getFormat().parse(this.maxDate).getMonth(), this.getFormat().parse(this.maxDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			const jsDate = new Date(this.getFormat().parse(this.minDate).getFullYear(), this.getFormat().parse(this.minDate).getMonth(), this.getFormat().parse(this.minDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.minDate;
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
	}

	get styles() {
		return {
			main: {
				display: this._hidden ? "none" : "",
			},
		};
	}
}

YearPicker._ITEMS_COUNT = 20;
YearPicker._MIDDLE_ITEM_INDEX = 7;
YearPicker._MAX_YEAR = 9999;
YearPicker._MIN_YEAR = 1;

YearPicker.define();

var Gregorian = UniversalDate.extend('sap.ui.core.date.Gregorian', {
    constructor: function () {
        this.oDate = this.createDate(Date, arguments);
        this.sCalendarType = CalendarType$1.Gregorian;
    }
});
Gregorian.UTC = function () {
    return Date.UTC.apply(Date, arguments);
};
Gregorian.now = function () {
    return Date.now();
};
_Calendars.set(CalendarType$1.Gregorian, Gregorian);

const block0$c = (context) => { return html`<div class="${classMap(context.classes.main)}" style="${styleMap(context.styles.main)}"><ui5-calendar-header id="${ifDefined(context._id)}-head" month-text="${ifDefined(context._header.monthText)}" year-text="${ifDefined(context._header.yearText)}" .primaryCalendarType="${ifDefined(context._oMonth.primaryCalendarType)}" @ui5-previous-press="${ifDefined(context._header.onPressPrevious)}" @ui5-next-press="${ifDefined(context._header.onPressNext)}" @ui5-show-month-press="${ifDefined(context._header.onBtn1Press)}" @ui5-show-year-press="${ifDefined(context._header.onBtn2Press)}" ._isNextButtonDisabled="${ifDefined(context._header._isNextButtonDisabled)}" ._isPrevButtonDisabled="${ifDefined(context._header._isPrevButtonDisabled)}"></ui5-calendar-header><div id="${ifDefined(context._id)}-content"><ui5-daypicker id="${ifDefined(context._id)}-daypicker" class="${classMap(context.classes.dayPicker)}" format-pattern="${ifDefined(context._oMonth.formatPattern)}" .selectedDates="${ifDefined(context._oMonth.selectedDates)}" ._hidden="${ifDefined(context._oMonth._hidden)}" .primaryCalendarType="${ifDefined(context._oMonth.primaryCalendarType)}" .minDate="${ifDefined(context._oMonth.minDate)}" .maxDate="${ifDefined(context._oMonth.maxDate)}" timestamp="${ifDefined(context._oMonth.timestamp)}" @ui5-change="${ifDefined(context._oMonth.onSelectedDatesChange)}" @ui5-navigate="${ifDefined(context._oMonth.onNavigate)}" ?hide-week-numbers="${context.hideWeekNumbers}"></ui5-daypicker><ui5-monthpicker id="${ifDefined(context._id)}-MP" class="${classMap(context.classes.monthPicker)}" format-pattern="${ifDefined(context._oMonth.formatPattern)}" ._hidden="${ifDefined(context._monthPicker._hidden)}" .primaryCalendarType="${ifDefined(context._oMonth.primaryCalendarType)}" .minDate="${ifDefined(context._oMonth.minDate)}" .maxDate="${ifDefined(context._oMonth.maxDate)}" timestamp="${ifDefined(context._monthPicker.timestamp)}" @ui5-change="${ifDefined(context._monthPicker.onSelectedMonthChange)}"></ui5-monthpicker><ui5-yearpicker id="${ifDefined(context._id)}-YP" class="${classMap(context.classes.yearPicker)}" format-pattern="${ifDefined(context._oMonth.formatPattern)}" ._hidden="${ifDefined(context._yearPicker._hidden)}" .primaryCalendarType="${ifDefined(context._oMonth.primaryCalendarType)}" .minDate="${ifDefined(context._oMonth.minDate)}" .maxDate="${ifDefined(context._oMonth.maxDate)}" timestamp="${ifDefined(context._yearPicker.timestamp)}" ._selectedYear="${ifDefined(context._yearPicker._selectedYear)}" @ui5-change="${ifDefined(context._yearPicker.onSelectedYearChange)}"></ui5-yearpicker></div></div>`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var calendarCSS = ":host{display:inline-block}.ui5-daypicker--hidden,.ui5-monthpicker--hidden,.ui5-yearpicker--hidden{display:none}.ui5-cal-root{background:var(--sapList_Background)}.ui5-cal-root ui5-daypicker,.ui5-cal-root ui5-month-picker,.ui5-cal-root ui5-yearpicker{vertical-align:top}";

/**
 * @public
 */
const metadata$c = {
	tag: "ui5-calendar",
	properties: /** @lends  sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * Defines the UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {Integer}
		 * @public
		*/
		timestamp: {
			type: Integer,
		},

		/**
		 * Defines the calendar type used for display.
		 * If not defined, the calendar type of the global configuration is used.
		 * Available options are: "Gregorian", "Islamic", "Japanese", "Buddhist" and "Persian".
		 * @type {CalendarType}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Defines the selected dates as UTC timestamps.
		 * @type {Array}
		 * @public
		 */
		selectedDates: {
			type: Integer,
			multiple: true,
		},

		/**
		 * Determines the мinimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
		},

		/**
		 * Defines the visibility of the week numbers column.
		 * <br><br>
		 *
		 * <b>Note:<b> For calendars other than Gregorian,
		 * the week numbers are not displayed regardless of what is set.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		hideWeekNumbers: {
			type: Boolean,
		},

		_header: {
			type: Object,
		},

		_oMonth: {
			type: Object,
		},

		_monthPicker: {
			type: Object,
		},

		_yearPicker: {
			type: Object,
		},

		_calendarWidth: {
			type: String,
			noAttribute: true,
		},

		_calendarHeight: {
			type: String,
			noAttribute: true,
		},

		formatPattern: {
			type: String,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * Fired when the selected dates changed.
		 * @event sap.ui.webcomponents.main.Calendar#selected-dates-change
		 * @param {Array} dates The selected dates' timestamps
		 * @public
		 */
		"selected-dates-change": { type: Array },
	},
};

/**
 * @class
 *
 * The <code>ui5-calendar</code> can be used standale to display the years, months, weeks and days,
 * but the main purpose of the <code>ui5-calendar</code> is to be used within a <code>ui5-date-picker</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Calendar
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-calendar
 * @public
 */
class Calendar extends UI5Element {
	static get metadata() {
		return metadata$c;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$c;
	}

	static get styles() {
		return calendarCSS;
	}

	constructor() {
		super();
		this._oLocale = getLocale();
		this._oLocaleData = new LocaleData(this._oLocale);
		this._header = {};
		this._header.onPressPrevious = this._handlePrevious.bind(this);
		this._header.onPressNext = this._handleNext.bind(this);
		this._header.onBtn1Press = this._handleMonthButtonPress.bind(this);
		this._header.onBtn2Press = this._handleYearButtonPress.bind(this);

		this._oMonth = {};
		this._oMonth.onSelectedDatesChange = this._handleSelectedDatesChange.bind(this);
		this._oMonth.onNavigate = this._handleMonthNavigate.bind(this);

		this._monthPicker = {};
		this._monthPicker._hidden = true;
		this._monthPicker.onSelectedMonthChange = this._handleSelectedMonthChange.bind(this);

		this._yearPicker = {};
		this._yearPicker._hidden = true;
		this._yearPicker.onSelectedYearChange = this._handleSelectedYearChange.bind(this);

		this._isShiftingYears = false;
	}

	onBeforeRendering() {
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType });
		const minDateParsed = this.minDate && this.getFormat().parse(this.minDate);
		const maxDateParsed = this.maxDate && this.getFormat().parse(this.maxDate);
		const firstDayOfCalendarTimeStamp = -62135596800000;
		let currentMonth = 0;
		let currentYear = 1;

		if ((this.minDate || this.maxDate) && this._timestamp && !this.isInValidRange(this._timestamp * 1000)) {
			if (this._minDate) {
				this.timestamp = this._minDate / 1000;
			} else {
				this.timestamp = (new Date(firstDayOfCalendarTimeStamp)).getTime() / 1000;
			}
		}

		this._oMonth.formatPattern = this._formatPattern;
		this._oMonth.timestamp = this._timestamp;
		this._oMonth.selectedDates = [...this._selectedDates];
		this._oMonth.primaryCalendarType = this._primaryCalendarType;
		this._oMonth.minDate = this.minDate;
		this._oMonth.maxDate = this.maxDate;
		this._header.monthText = this._oLocaleData.getMonths("wide", this._primaryCalendarType)[this._month];
		this._header.yearText = oYearFormat.format(this._localDate);
		currentMonth = this.timestamp && CalendarDate.fromTimestamp(this.timestamp * 1000).getMonth();
		currentYear = this.timestamp && CalendarDate.fromTimestamp(this.timestamp * 1000).getYear();

		// month picker
		this._monthPicker.primaryCalendarType = this._primaryCalendarType;
		this._monthPicker.timestamp = this._timestamp;

		this._yearPicker.primaryCalendarType = this._primaryCalendarType;

		if (!this._isShiftingYears) {
			// year picker
			this._yearPicker.timestamp = this._timestamp;
		}

		this._isShiftingYears = false;

		if (!this._oMonth._hidden) {
			if (this.minDate
				&& minDateParsed.getMonth() === currentMonth
				&& minDateParsed.getFullYear() === currentYear) {
				this._header._isPrevButtonDisabled = true;
			} else {
				this._header._isPrevButtonDisabled = false;
			}

			if (this.maxDate
				&& maxDateParsed.getMonth() === currentMonth
				&& maxDateParsed.getFullYear() === currentYear) {
				this._header._isNextButtonDisabled = true;
			} else {
				this._header._isNextButtonDisabled = false;
			}
		}

		if (!this._yearPicker._hidden) {
			currentYear = this._yearPicker.timestamp && CalendarDate.fromTimestamp(this._yearPicker.timestamp * 1000).getYear();
			if (this.minDate
				&& (currentYear - minDateParsed.getFullYear()) < 1) {
				this._header._isPrevButtonDisabled = true;
			} else {
				this._header._isPrevButtonDisabled = false;
			}

			if (this.maxDate
				&& (maxDateParsed.getFullYear() - currentYear) < 1) {
				this._header._isNextButtonDisabled = true;
			} else {
				this._header._isNextButtonDisabled = false;
			}
		}
	}

	get _timestamp() {
		return this.timestamp !== undefined ? this.timestamp : Math.floor(new Date().getTime() / 1000);
	}

	get _localDate() {
		return new Date(this._timestamp * 1000);
	}

	get _calendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	get _month() {
		return this._calendarDate.getMonth();
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType$1() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get _selectedDates() {
		return this.selectedDates || [];
	}

	get _maxDate() {
		if (this.maxDate) {
			const jsDate = new Date(this.getFormat().parse(this.maxDate).getFullYear(), this.getFormat().parse(this.maxDate).getMonth(), this.getFormat().parse(this.maxDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}

		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			const jsDate = new Date(this.getFormat().parse(this.minDate).getFullYear(), this.getFormat().parse(this.minDate).getMonth(), this.getFormat().parse(this.minDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.minDate;
	}

	_handleSelectedDatesChange(event) {
		this.selectedDates = [...event.detail.dates];

		this.fireEvent("selected-dates-change", { dates: event.detail.dates });
	}

	_handleMonthNavigate(event) {
		this.timestamp = event.detail.timestamp;
	}

	_handleSelectedMonthChange(event) {
		const oNewDate = this._calendarDate;
		const newMonthIndex = CalendarDate.fromTimestamp(
			event.detail.timestamp * 1000,
			this._primaryCalendarType
		).getMonth();

		oNewDate.setMonth(newMonthIndex);
		this.timestamp = oNewDate.valueOf() / 1000;

		this._hideMonthPicker();

		this._focusFirstDayOfMonth(oNewDate);
	}

	_focusFirstDayOfMonth(targetDate) {
		let fistDayOfMonthIndex = -1;

		// focus first day of the month
		const dayPicker = this.shadowRoot.querySelector("ui5-daypicker");

		dayPicker._getVisibleDays(targetDate).forEach((date, index) => {
			if (date.getDate() === 1 && (fistDayOfMonthIndex === -1)) {
				fistDayOfMonthIndex = index;
			}
		});

		dayPicker._itemNav.currentIndex = fistDayOfMonthIndex;
		dayPicker._itemNav.focusCurrent();
	}

	_handleSelectedYearChange(event) {
		const oNewDate = CalendarDate.fromTimestamp(
			event.detail.timestamp * 1000,
			this._primaryCalendarType
		);
		oNewDate.setMonth(0);
		oNewDate.setDate(1);

		this.timestamp = oNewDate.valueOf() / 1000;

		this._hideYearPicker();

		this._focusFirstDayOfMonth(oNewDate);
	}

	_handleMonthButtonPress() {
		this._hideYearPicker();

		this[`_${this._monthPicker._hidden ? "show" : "hide"}MonthPicker`]();
	}

	_handleYearButtonPress() {
		this._hideMonthPicker();

		this[`_${this._yearPicker._hidden ? "show" : "hide"}YearPicker`]();
	}

	_handlePrevious() {
		if (this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showPrevMonth();
		} else if (this._monthPicker._hidden && !this._yearPicker._hidden) {
			this._showPrevPageYears();
		} else if (!this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showPrevYear();
		}
	}

	_handleNext() {
		if (this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showNextMonth();
		} else if (this._monthPicker._hidden && !this._yearPicker._hidden) {
			this._showNextPageYears();
		} else if (!this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showNextYear();
		}
	}

	_showNextMonth() {
		const nextMonth = this._calendarDate;
		nextMonth.setDate(1);
		nextMonth.setMonth(nextMonth.getMonth() + 1);

		if (nextMonth.getYear() > YearPicker._MAX_YEAR) {
			return;
		}

		if (!this.isInValidRange(nextMonth.toLocalJSDate().valueOf())) {
			return;
		}

		this._focusFirstDayOfMonth(nextMonth);
		this.timestamp = nextMonth.valueOf() / 1000;
	}

	_showPrevMonth() {
		let iNewMonth = this._month - 1,
			iNewYear = this._calendarDate.getYear();

		// focus first day of the month
		const dayPicker = this.shadowRoot.querySelector("ui5-daypicker");
		const currentMonthDate = dayPicker._calendarDate.setMonth(dayPicker._calendarDate.getMonth());
		const lastMonthDate = dayPicker._calendarDate.setMonth(dayPicker._calendarDate.getMonth() - 1);

		// set the date to last day of last month
		currentMonthDate.setDate(-1);

		// find the index of the last day
		let lastDayOfMonthIndex = -1;

		if (!this.isInValidRange(currentMonthDate.toLocalJSDate().valueOf())) {
			return;
		}

		dayPicker._getVisibleDays(lastMonthDate).forEach((date, index) => {
			const isSameDate = currentMonthDate.getDate() === date.getDate();
			const isSameMonth = currentMonthDate.getMonth() === date.getMonth();

			if (isSameDate && isSameMonth) {
				lastDayOfMonthIndex = (index + 1);
			}
		});

		const weekDaysCount = 7;

		if (lastDayOfMonthIndex !== -1) {
			// find the DOM for the last day index
			const lastDay = dayPicker.shadowRoot.querySelector(".ui5-dp-items-container").children[parseInt(lastDayOfMonthIndex / weekDaysCount)].children[(lastDayOfMonthIndex % weekDaysCount)];

			// update current item in ItemNavigation
			dayPicker._itemNav.current = lastDayOfMonthIndex;

			// focus the item
			lastDay.focus();
		}

		if (iNewMonth > 11) {
			iNewMonth = 0;
			iNewYear = this._calendarDate.getYear() + 1;
		}

		if (iNewMonth < 0) {
			iNewMonth = 11;
			iNewYear = this._calendarDate.getYear() - 1;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(iNewYear);
		oNewDate.setMonth(iNewMonth);


		if (oNewDate.getYear() < YearPicker._MIN_YEAR) {
			return;
		}
		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextYear() {
		if (this._calendarDate.getYear() === YearPicker._MAX_YEAR) {
			return;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(this._calendarDate.getYear() + 1);

		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showPrevYear() {
		if (this._calendarDate.getYear() === YearPicker._MIN_YEAR) {
			return;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(this._calendarDate.getYear() - 1);

		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextPageYears() {
		if (!this._isYearInRange(this._yearPicker.timestamp,
			YearPicker._ITEMS_COUNT - YearPicker._MIDDLE_ITEM_INDEX,
			YearPicker._MIN_YEAR,
			YearPicker._MAX_YEAR)) {
			return;
		}

		if (this.minDate && !this._isYearInRange(this._yearPicker.timestamp,
			YearPicker._ITEMS_COUNT - YearPicker._MIDDLE_ITEM_INDEX,
			this.getFormat().parse(this.minDate).getFullYear(),
			YearPicker._MAX_YEAR)) {
			return;
		}

		if (this.maxDate && !this._isYearInRange(this._yearPicker.timestamp,
			YearPicker._ITEMS_COUNT - YearPicker._MIDDLE_ITEM_INDEX,
			YearPicker._MIN_YEAR,
			this.getFormat().parse(this.maxDate).getFullYear())) {
			return;
		}

		this._yearPicker = Object.assign({}, this._yearPicker, {
			timestamp: this._yearPicker.timestamp + (31536000 * YearPicker._ITEMS_COUNT),
		});

		this._isShiftingYears = true;
	}

	_showPrevPageYears() {
		if (!this._isYearInRange(this._yearPicker.timestamp,
			-YearPicker._MIDDLE_ITEM_INDEX - 1,
			YearPicker._MIN_YEAR,
			YearPicker._MAX_YEAR)) {
			return;
		}

		if (this.minDate && !this._isYearInRange(this._yearPicker.timestamp,
			-YearPicker._MIDDLE_ITEM_INDEX - 1,
			this.getFormat().parse(this.minDate).getFullYear(),
			YearPicker._MAX_YEAR)) {
			return;
		}

		if (this.maxDate && !this._isYearInRange(this._yearPicker.timestamp,
			-YearPicker._MIDDLE_ITEM_INDEX - 1,
			YearPicker._MIN_YEAR,
			this.getFormat().parse(this.maxDate).getFullYear())) {
			return;
		}

		this._yearPicker = Object.assign({}, this._yearPicker, {
			timestamp: this._yearPicker.timestamp - (31536000 * YearPicker._ITEMS_COUNT),
		});

		this._isShiftingYears = true;
	}

	_showMonthPicker() {
		this._monthPicker = Object.assign({}, this._monthPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._monthPicker.timestamp = this._timestamp;
		this._monthPicker._hidden = false;
		this._oMonth._hidden = true;

		const calendarRect = this.shadowRoot.querySelector(".ui5-cal-root").getBoundingClientRect();

		this._calendarWidth = calendarRect.width.toString();
		this._calendarHeight = calendarRect.height.toString();
	}

	_showYearPicker() {
		this._yearPicker = Object.assign({}, this._yearPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._yearPicker.timestamp = this._timestamp;
		this._yearPicker._selectedYear = this._calendarDate.getYear();
		this._yearPicker._hidden = false;
		this._oMonth._hidden = true;

		const calendarRect = this.shadowRoot.querySelector(".ui5-cal-root").getBoundingClientRect();

		this._calendarWidth = calendarRect.width.toString();
		this._calendarHeight = calendarRect.height.toString();
	}

	_hideMonthPicker() {
		this._monthPicker = Object.assign({}, this._monthPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._monthPicker._hidden = true;
		this._oMonth._hidden = false;
	}

	_hideYearPicker() {
		this._yearPicker = Object.assign({}, this._yearPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._yearPicker._hidden = true;
		this._oMonth._hidden = false;
	}

	_isYearInRange(timestamp, yearsoffset, min, max) {
		if (timestamp) {
			const oCalDate = CalendarDate.fromTimestamp(timestamp * 1000, this._primaryCalendarType);
			oCalDate.setMonth(0);
			oCalDate.setDate(1);
			oCalDate.setYear(oCalDate.getYear() + yearsoffset);
			return oCalDate.getYear() >= min && oCalDate.getYear() <= max;
		}
	}

	get classes() {
		return {
			main: {
				"ui5-cal-root": true,
			},
			dayPicker: {
				".ui5-daypicker--hidden": !this._yearPicker._hidden || !this._monthPicker._hidden,
			},
			yearPicker: {
				"ui5-yearpicker--hidden": this._yearPicker._hidden,
			},
			monthPicker: {
				"ui5-monthpicker--hidden": this._monthPicker._hidden,
			},
		};
	}

	/**
	 * Checks if a date is in range between minimum and maximum date
	 * @param {object} value
	 * @public
	 */
	isInValidRange(value = "") {
		const pickedDate = CalendarDate.fromTimestamp(value).toLocalJSDate(),
			minDate = this._minDate && new Date(this._minDate),
			maxDate = this._maxDate && new Date(this._maxDate);

		if (minDate && maxDate) {
			if (minDate <= pickedDate && maxDate >= pickedDate) {
				return true;
			}
		} else if (minDate && !maxDate) {
			if (minDate <= pickedDate) {
				return true;
			}
		} else if (maxDate && !minDate) {
			if (maxDate >= pickedDate) {
				return true;
			}
		} else if (!maxDate && !minDate) {
			return true;
		}

		return false;
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
	}

	get styles() {
		return {
			main: {
				"height": `${this._calendarHeight ? `${this._calendarHeight}px` : "auto"}`,
				"width": `${this._calendarWidth ? `${this._calendarWidth}px` : "auto"}`,
			},
		};
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			CalendarHeader.define(),
			DayPicker.define(),
			MonthPicker.define(),
			YearPicker.define(),
		]);
	}
}

Calendar.define();

class NativeResize {
	static initialize() {
		NativeResize.resizeObserver = new window.ResizeObserver(entries => {
			// call attached callbacks
			entries.forEach(entry => {
				const callbacks = NativeResize.observedObjects.get(entry.target);

				callbacks.forEach(el => el());
			});
		});

		NativeResize.observedObjects = new Map();
	}

	static attachListener(ref, callback) {
		const observedDOMs = NativeResize.observedObjects;
		const callbacks = observedDOMs.get(ref) || [];

		// if no callbacks has been added for this ref - start observing it
		if (!callbacks.length) {
			NativeResize.resizeObserver.observe(ref);
		}

		// save the callbacks in an array
		observedDOMs.set(ref, [...callbacks, callback]);
	}

	static detachListener(ref, callback) {
		const callbacks = NativeResize.observedObjects.get(ref) || [];
		const filteredCallbacks = callbacks.filter(fn => fn !== callback);

		if (!callbacks.length || (callbacks.length === filteredCallbacks.length && callbacks.length !== 0)) {
			return;
		}

		NativeResize.observedObjects.set(ref, filteredCallbacks);

		if (!filteredCallbacks.length) {
			NativeResize.resizeObserver.unobserve(ref);
		}
	}
}

const INTERVAL = 300;

class CustomResize {
	static initialize() {
		CustomResize.initialized = false;
		CustomResize.resizeInterval = undefined;
		CustomResize.resizeListeners = new Map();
	}

	static attachListener(ref, callback) {
		const observedObject = CustomResize.resizeListeners.get(ref);
		const existingCallbacks = observedObject ? observedObject.callbacks : [];

		CustomResize.resizeListeners.set(ref, {
			width: ref ? ref.offsetWidth : 0,
			height: ref ? ref.offsetHeight : 0,
			callbacks: existingCallbacks.concat(callback),
		});

		CustomResize.initListener();
	}

	static initListener() {
		if (CustomResize.resizeListeners.size > 0 && !CustomResize.initialized) {
			CustomResize.resizeInterval = setInterval(CustomResize.checkListeners.bind(CustomResize), INTERVAL);
		}
	}

	static checkListeners() {
		CustomResize.resizeListeners.forEach((entry, ref) => {
			const changed = CustomResize.checkSizes(entry, ref);

			if (changed || (entry && !entry._hasBeenRendered)) {
				CustomResize.updateSizes(entry, ref.offsetWidth, ref.offsetHeight);
				entry.callbacks.forEach(el => el());
				entry._hasBeenRendered = true;
			}
		});
	}

	static updateSizes(sizes, newWidth, newHeight) {
		sizes.width = newWidth;
		sizes.height = newHeight;
	}

	static checkSizes(entry, ref) {
		const oldHeight = entry.height;
		const oldWidth = entry.width;
		const newHeight = ref.offsetHeight;
		const newWidth = ref.offsetWidth;

		return ((oldHeight !== newHeight) || oldWidth !== newWidth);
	}

	static detachListener(ref, callback) {
		const listenerObject = CustomResize.resizeListeners.get(ref);
		const callbacks = listenerObject ? listenerObject.callbacks : [];
		const filteredCallbacks = callbacks.filter(fn => fn !== callback);

		if (!listenerObject || (callbacks.length === filteredCallbacks.length && callbacks.length !== 0)) {
			return;
		}

		CustomResize.resizeListeners.set(ref, Object.assign(listenerObject, { callbacks: filteredCallbacks }));

		if (!filteredCallbacks.length) {
			listenerObject.callbacks = null;
			CustomResize.resizeListeners.delete(ref);
		}

		if (CustomResize.resizeListeners.size === 0) {
			CustomResize.initialized = false;
			clearInterval(CustomResize.resizeInterval);
		}
	}
}

class ResizeHandler {
	static initialize() {
		ResizeHandler.Implementation = window.ResizeObserver ? NativeResize : CustomResize;
		ResizeHandler.Implementation.initialize();
	}

	/**
	 * @static
	 * @private
	 * @param {*} ref Reference to be observed
	 * @param {*} callback Callback to be executed
	 * @memberof ResizeHandler
	 */
	static attachListener(ref, callback) {
		ResizeHandler.Implementation.attachListener.call(ResizeHandler.Implementation, ref, callback);
	}

	/**
	 * @static
	 * @private
	 * @param {*} ref Reference to be unobserved
	 * @memberof ResizeHandler
	 */
	static detachListener(ref, callback) {
		ResizeHandler.Implementation.detachListener.call(ResizeHandler.Implementation, ref, callback);
	}


	/**
	 * @static
	 * @public
	 * @param {*} ref Reference to a UI5 Web Component or DOM Element to be observed
	 * @param {*} callback Callback to be executed
	 * @memberof ResizeHandler
	 */
	static register(ref, callback) {
		if (ref.isUI5Element) {
			ref = ref.getDomRef();
		}

		ResizeHandler.attachListener(ref, callback);
	}


	/**
	 * @static
	 * @public
	 * @param {*} ref Reference to UI5 Web Component or DOM Element to be unobserved
	 * @memberof ResizeHandler
	 */
	static deregister(ref, callback) {
		if (ref.isUI5Element) {
			ref = ref.getDomRef();
		}

		ResizeHandler.detachListener(ref, callback);
	}
}

ResizeHandler.initialize();

/**
 * @lends sap.ui.webcomponents.main.types.InputType.prototype
 * @public
 */
const InputTypes = {
	/**
	 * <ui5-input type="text"></ui5-input> defines a one-line text input field:
	 * @public
	 * @type {Text}
	 */
	Text: "Text",

	/**
	 * The <ui5-input type="email"></ui5-input> is used for input fields that must contain an e-mail address.
	 * @public
	 * @type {Email}
	 */
	Email: "Email",

	/**
	 * The <ui5-input type="number"></ui5-input> defines a numeric input field.
	 * @public
	 * @type {Number}
	 */
	Number: "Number",

	/**
	 * <ui5-input type="password"></ui5-input> defines a password field.
	 * @public
	 * @type {Password}
	 */
	Password: "Password",

	/**
	 * The <ui5-input type="url"></ui5-input> is used for input fields that should contain a telephone number.
	 * @public
	 * @type {Tel}
	 */
	Tel: "Tel",

	/**
	 * The <i5-input type="url"></ui5-input> is used for input fields that should contain a URL address.
	 * @public
	 * @type {URL}
	 */
	URL: "URL",
};

/**
 * @class
 * Defines input types
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.InputType
 * @public
 * @enum {string}
 */
class InputType extends DataType {
	static isValid(value) {
		return !!InputTypes[value];
	}
}

InputType.generataTypeAcessors(InputTypes);

const block0$d = (context) => { return html`<div class="ui5-input-root" @focusin="${context._onfocusin}" @focusout="${context._onfocusout}"><div class="ui5-input-content"><input id="${ifDefined(context._id)}-inner" class="ui5-input-inner" type="${ifDefined(context.inputType)}" inner-input ?disabled="${context.disabled}" ?readonly="${context._readonly}" ?required="${context.required}" .value="${ifDefined(context.value)}" placeholder="${ifDefined(context.placeholder)}" maxlength="${ifDefined(context.maxlength)}" role="${ifDefined(context.accInfo.input.role)}" aria-owns="${ifDefined(context.accInfo.input.ariaOwns)}" ?aria-invalid="${context.accInfo.input.ariaInvalid}" aria-haspopup="${ifDefined(context.accInfo.input.ariaHasPopup)}" aria-describedby="${ifDefined(context.accInfo.input.ariaDescribedBy)}" aria-autocomplete="${ifDefined(context.accInfo.input.ariaAutoComplete)}" aria-expanded="${ifDefined(context.accInfo.input.ariaExpanded)}" aria-label="${ifDefined(context.accInfo.input.ariaLabel)}" @input="${context._handleInput}" @change="${context._handleChange}" @keydown="${context._onkeydown}" @keyup="${context._onkeyup}" @click=${context._click} data-sap-no-tab-ref data-sap-focus-ref step="${ifDefined(context.step)}" />${ context.icon.length ? block1$9() : undefined }${ context.showSuggestions ? block2$8(context) : undefined }${ context.accInfo.input.ariaDescription ? block3$5(context) : undefined }${ context.hasValueState ? block4$4(context) : undefined }</div><slot name="formSupport"></slot></div>`; };
const block1$9 = (context) => { return html`<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`; };
const block2$8 = (context) => { return html`<span id="${ifDefined(context._id)}-suggestionsText" class="ui5-hidden-text">${ifDefined(context.suggestionsText)}</span><span id="${ifDefined(context._id)}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${ifDefined(context._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${ifDefined(context.availableSuggestionsCount)}</span>`; };
const block3$5 = (context) => { return html`<span id="${ifDefined(context._id)}-descr" class="ui5-hidden-text">${ifDefined(context.accInfo.input.ariaDescription)}</span>`; };
const block4$4 = (context) => { return html`<span id="${ifDefined(context._id)}-valueStateDesc" class="ui5-hidden-text">${ifDefined(context.valueStateText)}</span>`; };

const block0$e = (context) => { return html`${ context.showSuggestions ? block1$a(context) : undefined }${ context.hasValueStateMessage ? block17(context) : undefined } `; };
const block1$a = (context) => { return html`<ui5-responsive-popover no-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${styleMap(context.styles.suggestionsPopover)}" @ui5-after-open="${ifDefined(context._afterOpenPopover)}" @ui5-after-close="${ifDefined(context._afterClosePopover)}" @scroll="${context._scroll}">${ context._isPhone ? block2$9(context) : undefined }${ !context._isPhone ? block7$2(context) : undefined }<ui5-list separators="${ifDefined(context.suggestionSeparators)}">${ repeat(context.suggestionsTexts, (item, index) => item._id || index, (item, index) => block12(item)) }</ui5-list>${ context._isPhone ? block16(context) : undefined }</ui5-responsive-popover>`; };
const block2$9 = (context) => { return html`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${ifDefined(context._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${context._closeRespPopover}"></ui5-button></div><div class="row"><div class="input-root-phone"><input class="ui5-input-inner-phone" type="${ifDefined(context.inputType)}" .value="${ifDefined(context.value)}" inner-input placeholder="${ifDefined(context.placeholder)}" @input="${context._handleInput}" @change="${context._handleChange}" /></div></div>${ context.hasValueStateMessage ? block3$6(context) : undefined }</div>`; };
const block3$6 = (context) => { return html`<div class="row ${classMap(context.classes.popoverValueState)}" style="${styleMap(context.styles.suggestionPopoverHeader)}">${ context.shouldDisplayDefaultValueStateMessage ? block4$5(context) : block5$4(context) }</div>`; };
const block4$5 = (context) => { return html`${ifDefined(context.valueStateText)}`; };
const block5$4 = (context) => { return html`${ repeat(context.valueStateMessageText, (item, index) => item._id || index, (item, index) => block6$3(item)) }`; };
const block6$3 = (item, index, context) => { return html`${ifDefined(item)}`; };
const block7$2 = (context) => { return html`${ context.hasValueStateMessage ? block8$1(context) : undefined }`; };
const block8$1 = (context) => { return html`<div slot="header" class="ui5-responsive-popover-header ${classMap(context.classes.popoverValueState)}" style=${styleMap(context.styles.suggestionPopoverHeader)}>${ context.shouldDisplayDefaultValueStateMessage ? block9$1(context) : block10$1(context) }</div>`; };
const block9$1 = (context) => { return html`${ifDefined(context.valueStateText)}`; };
const block10$1 = (context) => { return html`${ repeat(context.valueStateMessageText, (item, index) => item._id || index, (item, index) => block11(item)) }`; };
const block11 = (item, index, context) => { return html`${ifDefined(item)}`; };
const block12 = (item, index, context) => { return html`${ item.group ? block13(item) : block14(item) }`; };
const block13 = (item, index, context) => { return html`<ui5-li-groupheader data-ui5-key="${ifDefined(item.key)}">${unsafeHTML(item.text)}</ui5-li-groupheader>`; };
const block14 = (item, index, context) => { return html`<ui5-li-suggestion-item image="${ifDefined(item.image)}" icon="${ifDefined(item.icon)}" info="${ifDefined(item.info)}" type="${ifDefined(item.type)}" info-state="${ifDefined(item.infoState)}" @ui5-_item-press="${ifDefined(item.fnOnSuggestionItemPress)}" data-ui5-key="${ifDefined(item.key)}">${unsafeHTML(item.text)}${ item.description ? block15(item) : undefined }</ui5-li-suggestion-item>`; };
const block15 = (item, index, context) => { return html`<span slot="richDescription">${unsafeHTML(item.description)}</span>`; };
const block16 = (context) => { return html`<div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${context._closeRespPopover}">OK</ui5-button></div>`; };
const block17 = (context) => { return html`<ui5-popover skip-registry-update _disable-initial-focus prevent-focus-restore no-padding no-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom"><div slot="header" class="ui5-responsive-popover-header ${classMap(context.classes.popoverValueState)}" style="${styleMap(context.styles.popoverHeader)}">${ context.shouldDisplayDefaultValueStateMessage ? block18(context) : block19(context) }</div></ui5-popover>`; };
const block18 = (context) => { return html`${ifDefined(context.valueStateText)}`; };
const block19 = (context) => { return html`${ repeat(context.valueStateMessageText, (item, index) => item._id || index, (item, index) => block20(item)) }`; };
const block20 = (item, index, context) => { return html`${ifDefined(item)}`; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var styles$4 = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}:host(:not([hidden])){display:inline-block}:host{width:var(--_ui5_input_width);min-width:var(--_ui5_input_width);height:var(--_ui5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:var(--sapFontFamily);font-style:normal;background-color:var(--sapField_Background);border:1px solid var(--sapField_BorderColor);border-radius:var(--_ui5_input_wrapper_border_radius);box-sizing:border-box}:host([focused]){outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);outline-offset:-3px}:host([value-state]:not([value-state=None])[focused]){outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);outline-offset:-4px}.ui5-input-root{width:100%;height:100%;background:transparent;display:inline-block;outline:none;box-sizing:border-box;color:inherit}:host([disabled]){opacity:var(--_ui5_input_disabled_opacity);cursor:default;pointer-events:none;background:var(--sapField_ReadOnly_Background);border-color:var(--sapField_ReadOnly_BorderColor);-webkit-text-fill-color:var(--sapContent_DisabledTextColor);color:var(--sapContent_DisabledTextColor)}[inner-input]{background:transparent;color:inherit;border:none;font-style:inherit;-webkit-appearance:none;-moz-appearance:textfield;line-height:normal;padding:var(--_ui5_input_inner_padding);box-sizing:border-box;min-width:3rem;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit}[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}:host([disabled]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-webkit-input-placeholder{visibility:hidden}[inner-input]::-webkit-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}:host([disabled]) [inner-input]::-moz-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-moz-placeholder{visibility:hidden}[inner-input]::-moz-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}:host([disabled]) [inner-input]:-ms-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]:-ms-input-placeholder{visibility:hidden}[inner-input]:-ms-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}.ui5-input-content{height:100%;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-end;overflow:hidden;outline:none;background:transparent;color:inherit}:host([readonly]){border-color:var(--sapField_ReadOnly_BorderColor);background:var(--sapField_ReadOnly_Background)}:host(:not([value-state]):not([readonly]):hover){background-color:var(--sapField_Hover_Background);border:1px solid var(--sapField_Hover_BorderColor)}:host([value-state=None]:not([readonly]):hover){background-color:var(--sapField_Hover_Background);border:1px solid var(--sapField_Hover_BorderColor)}:host([value-state]:not([value-state=None])){border-width:var(--_ui5_input_state_border_width)}:host([value-state=Error]) [inner-input],:host([value-state=Warning]) [inner-input]{font-style:var(--_ui5_input_error_warning_font_style)}:host([value-state=Error]) [inner-input]{font-weight:var(--_ui5_input_error_font_weight)}:host([value-state=Error]:not([readonly])){background-color:var(--sapField_InvalidBackground);border-color:var(--sapField_InvalidColor)}:host([value-state=Error]:not([readonly]):not([disabled])),:host([value-state=Information]:not([readonly]):not([disabled])),:host([value-state=Warning]:not([readonly]):not([disabled])){border-style:var(--_ui5_input_error_warning_border_style)}:host([value-state=Warning]:not([readonly])){background-color:var(--sapField_WarningBackground);border-color:var(--sapField_WarningColor)}:host([value-state=Success]:not([readonly])){background-color:var(--sapField_SuccessBackground);border-color:var(--sapField_SuccessColor);border-width:1px}:host([value-state=Information]:not([readonly])){background-color:var(--sapField_InformationBackground);border-color:var(--sapField_InformationColor);border-width:var(--_ui5-input-information_border_width)}[inner-input]::-ms-clear{height:0;width:0}.ui5-input-icon-root{min-width:var(--_ui5_input_icon_min_width);height:100%;display:flex;justify-content:center;align-items:center}::slotted(ui5-icon[slot=icon]){padding:var(--_ui5_input_icon_padding)}";

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var ResponsivePopoverCommonCss = ".input-root-phone{flex:1;height:var(--_ui5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:var(--sapFontFamily);background-color:var(--sapField_Background);border:1px solid var(--sapField_BorderColor);border-radius:var(--_ui5_input_wrapper_border_radius);box-sizing:border-box}.input-root-phone [inner-input]{padding:0 .5rem;width:100%;height:100%}.input-root-phone[value-state]:not([value-state=None])[focused]{outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);outline-offset:-4px}.input-root-phone [value-state=Error] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Success] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Warning] [input-icon][data-ui5-compact-size]{padding:.1875rem .5rem}[inner-input]{background:transparent;color:inherit;border:none;font-style:normal;-webkit-appearance:none;-moz-appearance:textfield;line-height:normal;padding:var(--_ui5_input_inner_padding);box-sizing:border-box;min-width:3rem;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit}[inner-input]::-moz-selection,[inner-input]::selection{background:var(--sapSelected);color:var(--sapContent_contrastTextColor)}[inner-input]::-webkit-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]::-moz-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]:-ms-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}.input-root-phone[value-state]:not([value-state=None]){border-width:var(--_ui5_input_state_border_width)}.input-root-phone[value-state=Error] [inner-input],.input-root-phone[value-state=Warning] [inner-input]{font-style:var(--_ui5_input_error_warning_font_style)}.input-root-phone[value-state=Error] [inner-input]{font-weight:var(--_ui5_input_error_font_weight)}.input-root-phone[value-state=Error]:not([readonly]){background-color:var(--sapField_InvalidBackground);border-color:var(--sapField_InvalidColor)}.input-root-phone[value-state=Error]:not([readonly]):not([disabled]),.input-root-phone[value-state=Warning]:not([readonly]):not([disabled]){border-style:var(--_ui5_input_error_warning_border_style)}.input-root-phone[value-state=Warning]:not([readonly]){background-color:var(--sapField_WarningBackground);border-color:var(--sapField_WarningColor)}.input-root-phone[value-state=Success]:not([readonly]){background-color:var(--sapField_SuccessBackground);border-color:var(--sapField_SuccessColor)}[inner-input]::-ms-clear{height:0;width:0}.ui5-multi-combobox-toggle-button{margin-left:.5rem}.ui5-responsive-popover-header{width:100%;min-height:2.5rem;display:flex;flex-direction:column}.ui5-responsive-popover-header .row{box-sizing:border-box;padding:.25rem 1rem;height:2.5rem;display:flex;justify-content:center;align-items:center;font-size:var(--sapFontHeader5Size)}.ui5-responsive-popover-footer{display:flex;justify-content:flex-end;padding:.25rem;width:100%}.ui5-responsive-popover-close-btn{position:absolute;right:1rem}";

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var ValueStateMessageCss = ".ui5-valuestatemessage-popover{min-height:1rem;box-shadow:none}.ui5-valuestatemessage-root{box-sizing:border-box;display:inline-block;color:var(--sapUiBaseColor);font-size:var(--sapFontSmallSize);font-family:var(--sapFontFamily);padding:.3rem .625rem;overflow:hidden;text-overflow:ellipsis;min-width:6.25rem;border:var(--_ui5_value_state_message_border)}.ui5-valuestatemessage--success{background:var(--sapSuccessBackground)}.ui5-valuestatemessage--warning{background:var(--sapWarningBackground)}.ui5-valuestatemessage--error{background:var(--sapErrorBackground)}.ui5-valuestatemessage--information{background:var(--sapInformationBackground)}";

/**
 * @public
 */
const metadata$d = {
	tag: "ui5-input",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Input.prototype */ {

		/**
		 * Defines the icon to be displayed in the <code>ui5-input</code>.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		icon: {
			type: HTMLElement,
		},

		/**
		 * Defines the <code>ui5-input</code> suggestion items.
		 * <br><br>
		 * Example:
		 * <br><br>
		 * &lt;ui5-input show-suggestions><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #1">&lt;/ui5-suggestion-item><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-suggestion-item text="Item #2">&lt;/ui5-suggestion-item><br>
		 * &lt;/ui5-input>
		 * <br>
		 * <ui5-input show-suggestions>
		 * <ui5-suggestion-item text="Item #1"></ui5-suggestion-item>
		 * <ui5-suggestion-item text="Item #2"></ui5-suggestion-item>
		 * </ui5-input>
		 * <br><br>
		 * <b>Note:</b> The suggestion would be displayed only if the <code>showSuggestions</code>
		 * property is set to <code>true</code>.
		 * <br><br>
		 * <b>Note:</b> The &lt;ui5-suggestion-item> is recommended to be used as a suggestion item.
		 * Importing the Input Suggestions Support feature:
		 * <br>
		 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code>
		 * <br>
		 * also automatically imports the &lt;ui5-suggestion-item> for your convenience.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "suggestionItems",
			type: HTMLElement,
		},

		/**
		 * The slot is used for native <code>input</code> HTML element to enable form submit,
		 * when <code>name</code> property is set.
		 * @type {HTMLElement[]}
		 * @private
		 */
		formSupport: {
			type: HTMLElement,
		},

		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-input</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-input</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * <br>
		 * <b>Note:</b> If the <code>ui5-input</code> has <code>suggestionItems</code>,
		 * the <code>valueStateMessage</code> would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.6
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Input.prototype */  {

		/**
		 * Defines whether the <code>ui5-input</code> is in disabled state.
		 * <br><br>
		 * <b>Note:</b> A disabled <code>ui5-input</code> is completely noninteractive.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines if characters within the suggestions are to be highlighted
		 * in case the input value matches parts of the suggestions text.
		 * <br><br>
		 * <b>Note:</b> takes effect when <code>showSuggestions</code> is set to <code>true</code>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @sicne 1.0.0-rc.8
		 */
		highlight: {
			type: Boolean,
		},

		/**
		 * Defines a short hint intended to aid the user with data entry when the
		 * <code>ui5-input</code> has no value.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		placeholder: {
			type: String,
		},

		/**
		 * Defines whether the <code>ui5-input</code> is read-only.
		 * <br><br>
		 * <b>Note:</b> A read-only <code>ui5-input</code> is not editable,
		 * but still provides visual feedback upon user interaction.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines whether the <code>ui5-input</code> is required.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.3
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Defines the HTML type of the <code>ui5-input</code>.
		 * Available options are: <code>Text</code>, <code>Email</code>,
		 * <code>Number</code>, <code>Password</code>, <code>Tel</code>, and <code>URL</code>.
		 * <br><br>
		 * <b>Notes:</b>
		 * <ul>
		 * <li>The particular effect of this property differs depending on the browser
		 * and the current language settings, especially for type <code>Number</code>.</li>
		 * <li>The property is mostly intended to be used with touch devices
		 * that use different soft keyboard layouts depending on the given input type.</li>
		 * </ul>
		 *
		 * @type {InputType}
		 * @defaultvalue "Text"
		 * @public
		 */
		type: {
			type: InputType,
			defaultValue: InputType.Text,
		},

		/**
		 * Defines the value of the <code>ui5-input</code>.
		 * <br><br>
		 * <b>Note:</b> The property is updated upon typing.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-input</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 *
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Determines the name with which the <code>ui5-input</code> will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-input</code> so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines whether the <code>ui5-input</code> should show suggestions, if such are present.
		 * <br><br>
		 * <b>Note:</b>
		 * Don`t forget to import the <code>InputSuggestions</code> module from <code>"@ui5/webcomponents/dist/features/InputSuggestions.js"</code> to enable this functionality.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showSuggestions: {
			type: Boolean,
		},

		/**
		 * Sets the maximum number of characters available in the input field.
		 *
		 * @type {Integer}
		 * @since 1.0.0-rc.5
		 * @public
		 */
		maxlength: {
			type: Integer,
		},

		/**
		 * Defines the aria-label attribute for the input
		 *
		 * @type {String}
		 * @since 1.0.0-rc.8
		 * @private
		 * @defaultvalue ""
		 */
		ariaLabel: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the input
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		_input: {
			type: Object,
		},

		_inputAccInfo: {
			type: Object,
		},

		_wrapperAccInfo: {
			type: Object,
		},

		_inputWidth: {
			type: Integer,
		},

		_listWidth: {
			type: Integer,
		},

		_isPopoverOpen: {
			type: Boolean,
			noAttribute: true,
		},

		_inputIconFocused: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Input.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		 */
		change: {},

		/**
		 * Fired when the value of the <code>ui5-input</code> changes at each keystroke,
		 * and when a suggestion item has been selected.
		 *
		 * @event
		 * @public
		 */
		input: {},

		/**
		 * Fired when user presses Enter key on the <code>ui5-input</code>.
		 * <br><br>
		 * <b>Note:</b> The event is fired independent of whether there was a change before or not.
		 * If change was performed, the event is fired after the change event.
		 * The event is also fired when an item of the select list is selected by pressing Enter.
		 *
		 * @event
		 * @public
		 */
		submit: {},

		/**
		 * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-item-select
		 * @param {HTMLElement} item The selected item
		 * @public
		 */
		"suggestion-item-select": {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user navigates to a suggestion item via the ARROW keys,
		 * as a preview, before the final selection.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-item-preview
		 * @param {HTMLElement} item The previewed suggestion item
		 * @param {HTMLElement} targetRef The DOM ref of the suggestion item.
		 * @public
		 * @since 1.0.0-rc.8
		 */
		"suggestion-item-preview": {
			detail: {
				item: { type: HTMLElement },
				targetRef: { type: HTMLElement },
			},
		},

		/**
		 * Fired when the user scrolls the suggestion popover.
		 *
		 * @event sap.ui.webcomponents.main.Input#suggestion-scroll
		 * @param {Integer} scrollTop The current scroll position
		 * @param {HTMLElement} scrollContainer The scroll container
		 * @public
		 * @since 1.0.0-rc.8
		 */
		"suggestion-scroll": {
			detail: {
				scrollTop: { type: Integer },
				scrollContainer: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-input</code> component allows the user to enter and edit text or numeric values in one line.
 * <br>
 * Additionally, you can provide <code>suggestionItems</code>,
 * that are displayed in a popover right under the input.
 * <br><br>
 * The text field can be editable or read-only (<code>readonly</code> property),
 * and it can be enabled or disabled (<code>enabled</code> property).
 * To visualize semantic states, such as "error" or "warning", the <code>valueState</code> property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 * <br><br>
 * <b>Note:</b> If you are using the <code>ui5-input</code> as a single npm module,
 * don't forget to import the <code>InputSuggestions</code> module from
 * "@ui5/webcomponents/dist/features/InputSuggestions.js"
 * to enable the suggestions functionality.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Input.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code> (optional - for input suggestions support)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Input
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-input
 * @appenddocs SuggestionItem
 * @public
 */
class Input extends UI5Element {
	static get metadata() {
		return metadata$d;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$d;
	}

	static get staticAreaTemplate() {
		return block0$e;
	}

	static get styles() {
		return styles$4;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ValueStateMessageCss];
	}

	constructor() {
		super();
		// Indicates if there is selected suggestionItem.
		this.hasSuggestionItemSelected = false;

		// Represents the value before user moves selection between the suggestion items.
		// Used to register and fire "input" event upon [SPACE] or [ENTER].
		// Note: the property "value" is updated upon selection move and can`t be used.
		this.valueBeforeItemSelection = "";

		// tracks the value between focus in and focus out to detect that change event should be fired.
		this.previousValue = undefined;

		// Indicates, if the component is rendering for first time.
		this.firstRendering = true;

		// The value that should be highlited.
		this.highlightValue = "";

		// all sementic events
		this.EVENT_SUBMIT = "submit";
		this.EVENT_CHANGE = "change";
		this.EVENT_INPUT = "input";
		this.EVENT_SUGGESTION_ITEM_SELECT = "suggestion-item-select";

		// all user interactions
		this.ACTION_ENTER = "enter";
		this.ACTION_USER_INPUT = "input";

		// Suggestions array initialization
		this.suggestionsTexts = [];

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");

		this._handleResizeBound = this._handleResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	onBeforeRendering() {
		if (this.showSuggestions) {
			this.enableSuggestions();
			this.suggestionsTexts = this.Suggestions.defaultSlotProperties(this.highlightValue);
		}

		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	onAfterRendering() {
		if (!this.firstRendering && !isPhone() && this.Suggestions) {
			const shouldOpenSuggestions = this.shouldOpenSuggestions();

			this.updateStaticAreaItemContentDensity();
			this.Suggestions.toggle(shouldOpenSuggestions, {
				preventFocusRestore: !this.hasSuggestionItemSelected,
			});

			RenderScheduler.whenFinished().then(async () => {
				this._listWidth = await this.Suggestions._getListWidth();
			});

			if (!isPhone() && shouldOpenSuggestions) {
				// Set initial focus to the native input
				this.inputDomRef && this.inputDomRef.focus();
			}
		}

		if (!this.firstRendering && this.hasValueStateMessage) {
			this.toggle(this.shouldDisplayOnlyValueStateMessage);
		}

		this.firstRendering = false;
	}

	_onkeydown(event) {
		if (isUp(event)) {
			return this._handleUp(event);
		}

		if (isDown(event)) {
			return this._handleDown(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}

		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		this._keyDown = true;
	}

	_onkeyup(event) {
		this._keyDown = false;
	}

	/* Event handling */
	_handleUp(event) {
		if (this.Suggestions && this.Suggestions.isOpened()) {
			this.Suggestions.onUp(event);
		}
	}

	_handleDown(event) {
		if (this.Suggestions && this.Suggestions.isOpened()) {
			this.Suggestions.onDown(event);
		}
	}

	_handleSpace(event) {
		if (this.Suggestions) {
			this.Suggestions.onSpace(event);
		}
	}

	_handleEnter(event) {
		const itemPressed = !!(this.Suggestions && this.Suggestions.onEnter(event));
		if (!itemPressed) {
			this.fireEventByAction(this.ACTION_ENTER);
		}
	}

	async _onfocusin(event) {
		this.focused = true; // invalidating property
		this.previousValue = this.value;

		await this.getInputDOMRef();
		this._inputIconFocused = event.target && event.target === this.querySelector("ui5-icon");
	}

	_onfocusout(event) {
		const focusedOutToSuggestions = this.Suggestions && event.relatedTarget && event.relatedTarget.shadowRoot && event.relatedTarget.shadowRoot.contains(this.Suggestions.responsivePopover);
		const focusedOutToValueStateMessage = event.relatedTarget && event.relatedTarget.shadowRoot && event.relatedTarget.shadowRoot.querySelector(".ui5-valuestatemessage-root");

		// if focusout is triggered by pressing on suggestion item or value state message popover, skip invalidation, because re-rendering
		// will happen before "itemPress" event, which will make item "active" state not visualized
		if (focusedOutToSuggestions	|| focusedOutToValueStateMessage) {
			event.stopImmediatePropagation();
			return;
		}

		const toBeFocused = event.relatedTarget;

		if (toBeFocused && toBeFocused.classList.contains(this._id)) {
			return;
		}

		if (this.popover) {
			this.popover.close();
		}

		this.previousValue = "";
		this.focused = false; // invalidating property
	}

	_click(event) {
		if (isPhone() && !this.readonly && this.Suggestions) {
			this.updateStaticAreaItemContentDensity();
			this.Suggestions.open(this);
			this.isRespPopoverOpen = true;
		}
	}

	_handleChange(event) {
		this.fireEvent(this.EVENT_CHANGE);
	}

	_scroll(event) {
		const detail = event.detail;
		this.fireEvent("suggestion-scroll", {
			scrollTop: detail.scrollTop,
			scrollContainer: detail.targetRef,
		});
	}

	async _handleInput(event) {
		await this.getInputDOMRef();
		if (event.target === this.inputDomRef) {
			// stop the native event, as the semantic "input" would be fired.
			event.stopImmediatePropagation();
		}

		/* skip calling change event when an input with a placeholder is focused on IE
			- value of the host and the internal input should be differnt in case of actual input
			- input is called when a key is pressed => keyup should not be called yet
		*/
		const skipFiring = (this.inputDomRef.value === this.value) && isIE() && !this._keyDown && !!this.placeholder;

		!skipFiring && this.fireEventByAction(this.ACTION_USER_INPUT);

		this.hasSuggestionItemSelected = false;

		if (this.Suggestions) {
			this.Suggestions.updateSelectedItemPosition(null);
		}
	}

	_handleResize() {
		this._inputWidth = this.offsetWidth;
	}

	_closeRespPopover() {
		this.Suggestions.close();
	}

	async _afterOpenPopover() {
		// Set initial focus to the native input
		if (isPhone()) {
			await this.getInputDOMRef();
			this.inputDomRef.focus();
		}
	}

	_afterClosePopover() {
		this.announceSelectedItem();

		// close device's keyboard and prevent further typing
		if (isPhone()) {
			this.blur();
		}
	}

	toggle(isToggled) {
		if (isToggled && !this.isRespPopoverOpen) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	/**
	 * Checks if the popover is open.
	 * @returns {Boolean} true if the popover is open, false otherwise
	 * @public
	 */
	isOpen() {
		return !!this._isPopoverOpen;
	}

	async openPopover() {
		this.popover = await this._getPopover();
		if (this.popover) {
			this._isPopoverOpen = true;
			this.popover.openBy(this);
		}
	}

	closePopover() {
		if (this.isOpen()) {
			this._isPopoverOpen = false;
			this.popover && this.popover.close();
		}
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("ui5-popover");
	}

	enableSuggestions() {
		if (this.Suggestions) {
			this.Suggestions.highlight = this.highlight;
			return;
		}

		const Suggestions = getFeature("InputSuggestions");
		if (Suggestions) {
			this.Suggestions = new Suggestions(this, "suggestionItems", this.highlight);
		} else {
			throw new Error(`You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions`);
		}
	}

	shouldOpenSuggestions() {
		return !!(this.suggestionItems.length
			&& this.focused
			&& this.showSuggestions
			&& !this.hasSuggestionItemSelected);
	}

	selectSuggestion(item, keyboardUsed) {
		if (item.group) {
			return;
		}

		const itemText = item.text || item.textContent; // keep textContent for compatibility
		const fireInput = keyboardUsed
			? this.valueBeforeItemSelection !== itemText : this.value !== itemText;

		this.hasSuggestionItemSelected = true;
		this.fireEvent(this.EVENT_SUGGESTION_ITEM_SELECT, { item });

		if (fireInput) {
			this.value = itemText;
			this.valueBeforeItemSelection = itemText;
			this.fireEvent(this.EVENT_INPUT);
			this.fireEvent(this.EVENT_CHANGE);
		}
	}

	previewSuggestion(item) {
		this.valueBeforeItemSelection = this.value;
		this.updateValueOnPreview(item);
		this.announceSelectedItem();
		this._previewItem = item;
	}

	/**
	 * Updates the input value on item preview.
	 * @param {Object} item The item that is on preview
	 */
	updateValueOnPreview(item) {
		const noPreview = item.type === "Inactive" || item.group;
		const itemValue = noPreview ? "" : (item.effectiveTitle || item.textContent);
		this.value = itemValue;
	}

	/**
	 * The suggestion item on preview.
	 * @type { ui5-suggestion-item }
	 * @readonly
	 * @public
	 */
	get previewItem() {
		if (!this._previewItem) {
			return null;
		}

		return this.getSuggestionByListItem(this._previewItem);
	}

	async fireEventByAction(action) {
		await this.getInputDOMRef();

		if (this.disabled || this.readonly) {
			return;
		}

		const inputValue = this.getInputValue();
		const isSubmit = action === this.ACTION_ENTER;
		const isUserInput = action === this.ACTION_USER_INPUT;

		const input = await this.getInputDOMRef();
		const cursorPosition = input.selectionStart;

		this.value = inputValue;
		this.highlightValue = inputValue;

		if (isSafari()) {
			// When setting the value by hand, Safari moves the cursor when typing in the middle of the text (See #1761)
			setTimeout(() => {
				input.selectionStart = cursorPosition;
				input.selectionEnd = cursorPosition;
			}, 0);
		}

		if (isUserInput) { // input
			this.fireEvent(this.EVENT_INPUT);
			// Angular two way data binding
			this.fireEvent("value-changed");
			return;
		}

		if (isSubmit) { // submit
			this.fireEvent(this.EVENT_SUBMIT);
		}

		// In IE, pressing the ENTER does not fire change
		const valueChanged = (this.previousValue !== undefined) && (this.previousValue !== this.value);
		if (isIE() && isSubmit && valueChanged) {
			this.fireEvent(this.EVENT_CHANGE);
		}
	}

	getInputValue() {
		const inputDOM = this.getDomRef();
		if (inputDOM) {
			return this.inputDomRef.value;
		}
		return "";
	}

	async getInputDOMRef() {
		let inputDomRef;

		if (isPhone() && this.Suggestions) {
			await this.Suggestions._respPopover();
			inputDomRef = this.Suggestions && this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone");
		}

		if (!inputDomRef) {
			inputDomRef = this.getDomRef().querySelector(`#${this.getInputId()}`);
		}

		this.inputDomRef = inputDomRef;
		return this.inputDomRef;
	}

	getLabelableElementId() {
		return this.getInputId();
	}

	getSuggestionByListItem(item) {
		const key = parseInt(item.getAttribute("data-ui5-key"));
		return this.suggestionItems[key];
	}

	/**
	 * Returns if the suggestions popover is scrollable.
	 * The method returns <code>Promise</code> that resolves to true,
	 * if the popup is scrollable and false otherwise.
	 * @returns {Promise}
	 */
	isSuggestionsScrollable() {
		if (!this.Suggestions) {
			return Promise.resolve(false);
		}

		return this.Suggestions._isScrollable();
	}

	getInputId() {
		return `${this._id}-inner`;
	}

	/* Suggestions interface  */
	onItemFocused() {}

	onItemMouseOver(event) {
		const item = event.target;
		const suggestion = this.getSuggestionByListItem(item);
		suggestion && suggestion.fireEvent("mouseover", {
			item: suggestion,
			targetRef: item,
		});
	}

	onItemMouseOut(event) {
		const item = event.target;
		const suggestion = this.getSuggestionByListItem(item);
		suggestion && suggestion.fireEvent("mouseout", {
			item: suggestion,
			targetRef: item,
		});
	}

	onItemSelected(item, keyboardUsed) {
		this.selectSuggestion(item, keyboardUsed);
	}

	onItemPreviewed(item) {
		this.previewSuggestion(item);
		this.fireEvent("suggestion-item-preview", {
			item: this.getSuggestionByListItem(item),
			targetRef: item,
		});
	}

	onOpen() {}

	onClose() {}

	valueStateTextMappings() {
		const i18nBundle = this.i18nBundle;

		return {
			"Success": i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Error": i18nBundle.getText(VALUE_STATE_ERROR),
			"Warning": i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	announceSelectedItem() {
		const invisibleText = this.shadowRoot.querySelector(`#${this._id}-selectionText`);

		if (this.Suggestions && this.Suggestions._isItemOnTarget()) {
			invisibleText.textContent = this.itemSelectionAnnounce;
		} else {
			invisibleText.textContent = "";
		}
	}

	get _readonly() {
		return this.readonly && !this.disabled;
	}

	get _headerTitleText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get inputType() {
		return this.type.toLowerCase();
	}

	get suggestionsTextId() {
		return this.showSuggestions ? `${this._id}-suggestionsText` : "";
	}

	get valueStateTextId() {
		return this.hasValueState ? `${this._id}-valueStateDesc` : "";
	}

	get accInfo() {
		const ariaHasPopupDefault = this.showSuggestions ? "true" : undefined;
		const ariaAutoCompleteDefault = this.showSuggestions ? "list" : undefined;
		const ariaDescribedBy = this._inputAccInfo.ariaDescribedBy ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this._id}-suggestionsCount ${this._inputAccInfo.ariaDescribedBy}`.trim() : `${this.suggestionsTextId} ${this.valueStateTextId} ${this._id}-suggestionsCount`.trim();

		return {
			"wrapper": {
			},
			"input": {
				"ariaDescribedBy": ariaDescribedBy,
				"ariaInvalid": this.valueState === ValueState.Error ? "true" : undefined,
				"ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
				"ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
				"role": this._inputAccInfo && this._inputAccInfo.role,
				"ariaOwns": this._inputAccInfo && this._inputAccInfo.ariaOwns,
				"ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
				"ariaDescription": this._inputAccInfo && this._inputAccInfo.ariaDescription,
				"ariaLabel": getEffectiveAriaLabelText(this),
			},
		};
	}

	get itemSelectionAnnounce() {
		return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : undefined;
	}

	get classes() {
		return {
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			popoverHeader: {
				"width": `${this._inputWidth}px`,
			},
			suggestionPopoverHeader: {
				"display": this._listWidth === 0 ? "none" : "inline-block",
				"width": `${this._listWidth}px`,
				"padding": "0.5625rem 1rem",
			},
			suggestionsPopover: {
				"max-width": `${this._inputWidth}px`,
			},
		};
	}

	get suggestionSeparators() {
		return "None";
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.shouldOpenSuggestions() && this.focused;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateMessage;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateMessage() {
		return this.hasValueState && this.valueState !== ValueState.Success
			&& (!this._inputIconFocused // Handles the cases when valueStateMessage is forwarded (from datepicker e.g.)
			|| (this._isPhone && this.Suggestions)); // Handles Input with suggestions on mobile
	}

	get valueStateText() {
		return this.valueStateTextMappings()[this.valueState];
	}

	get suggestionsText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS);
	}

	get availableSuggestionsCount() {
		if (this.showSuggestions) {
			switch (this.suggestionsTexts.length) {
			case 0:
				return this.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT);

			case 1:
				return this.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT);

			default:
				return this.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, this.suggestionsTexts.length);
			}
		}

		return undefined;
	}

	get step() {
		return this.type === InputType.Number ? "any" : undefined;
	}

	get _isPhone() {
		return isPhone();
	}

	static async onDefine() {
		await Promise.all([
			Popover.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

Input.define();

const block0$f = (context) => { return html`<div class="ui5-date-picker-root" style="${styleMap(context.styles.main)}" @keydown=${context._onkeydown}><!-- INPUT --><ui5-input id="${ifDefined(context._id)}-inner" class="ui5-date-picker-input" placeholder="${ifDefined(context._placeholder)}" type="${ifDefined(context.type)}" value="${ifDefined(context.value)}" ?disabled="${context.disabled}" ?readonly="${context.readonly}" value-state="${ifDefined(context.valueState)}" @ui5-change="${ifDefined(context._handleInputChange)}" @ui5-input="${ifDefined(context._handleInputLiveChange)}" data-sap-focus-ref ._inputAccInfo ="${ifDefined(context.accInfo)}">${ context.valueStateMessage.length ? block1$b() : undefined }${ !context.readonly ? block2$a(context) : undefined }</ui5-input><slot name="formSupport"></slot></div>`; };
const block1$b = (context) => { return html`<slot name="valueStateMessage" slot="valueStateMessage"></slot>`; };
const block2$a = (context) => { return html`<ui5-icon slot="icon" name="${ifDefined(context.openIconName)}" tabindex="-1" accessible-name="${ifDefined(context.openIconTitle)}" show-tooltip @click="${context.togglePicker}" input-icon ?pressed="${context._isPickerOpen}" dir="${ifDefined(context.effectiveDir)}"></ui5-icon>`; };

const block0$g = (context) => { return html`<ui5-responsive-popover id="${ifDefined(context._id)}-responsive-popover" allow-target-overlap="${ifDefined(context._respPopoverConfig.allowTargetOverlap)}" stay-open-on-scroll="${ifDefined(context._respPopoverConfig.stayOpenOnScroll)}" placement-type="Bottom" horizontal-align="Left" no-arrow with-padding no-stretch ?_hide-header=${ifDefined(context._shouldHideHeader)} @keydown="${context._onkeydown}" @ui5-after-close="${ifDefined(context._respPopoverConfig.afterClose)}" @ui5-after-open="${ifDefined(context._respPopoverConfig.afterOpen)}">${ context.showHeader ? block1$c(context) : undefined }<ui5-calendar id="${ifDefined(context._id)}-calendar" primary-calendar-type="${ifDefined(context._calendar.primaryCalendarType)}" format-pattern="${ifDefined(context._calendar.formatPattern)}" timestamp="${ifDefined(context._calendar.timestamp)}" .selectedDates="${ifDefined(context._calendar.selectedDates)}" .minDate="${ifDefined(context._calendar.minDate)}" .maxDate="${ifDefined(context._calendar.maxDate)}" @ui5-selected-dates-change="${ifDefined(context._calendar.onSelectedDatesChange)}" ?hide-week-numbers="${context.hideWeekNumbers}"></ui5-calendar>${ context.showFooter ? block2$b() : undefined }</ui5-responsive-popover>`; };
const block1$c = (context) => { return html`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${ifDefined(context._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${context.closePicker}"></ui5-button></div></div>`; };
const block2$b = (context) => { return html``; };

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var datePickerCss = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0}[input-icon]{color:var(--sapContent_IconColor);cursor:pointer;outline:none;padding:var(--_ui5_input_icon_padding);border-left:1px solid transparent;min-width:1rem;min-height:1rem}[input-icon][pressed]{background:var(--sapButton_Selected_Background);color:var(--sapButton_Active_TextColor)}[input-icon]:active{background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor)}[input-icon]:not([pressed]):not(:active):hover{background:var(--sapButton_Lite_Hover_Background)}[input-icon]:hover{border-left:var(--_ui5_select_hover_icon_left_border)}[input-icon][dir=rtl]:hover{border-left:none;border-right:var(--_ui5_select_hover_icon_left_border)}[input-icon][dir=rtl]{border-left:none;border-right:1px solid transparent}:host(:not([hidden])){display:inline-block}:host .ui5-date-picker-input{width:100%}";

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", defaultThemeBase);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", defaultTheme);
var datePickerPopoverCss = "ui5-calendar{width:100%}";

/**
 * @public
 */
const metadata$e = {
	tag: "ui5-date-picker",
	altTag: "ui5-datepicker",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends  sap.ui.webcomponents.main.DatePicker.prototype */ {
		/**
		 * Defines a formatted date value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-date-picker</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 *
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Determines the format, displayed in the input field.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		formatPattern: {
			type: String,
		},

		/**
		 * Determines the minimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
		},

		/**
		 * Determines the calendar type.
		 * The input value is formated according to the calendar type
		 * and the picker shows the months and years from the specified calendar.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Gregorian</code></li>
		 * <li><code>Islamic</code></li>
		 * <li><code>Japanese</code></li>
		 * <li><code>Buddhist</code></li>
		 * <li><code>Persian</code></li>
		 * </ul>
		 *
		 * @type {CalendarType}
		 * @defaultvalue "Gregorian"
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Determines whether the <code>ui5-date-picker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-date-picker</code> is displayed as read-only.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines a short hint, intended to aid the user with data entry when the
		 * <code>ui5-date-picker</code> has no value.
		 *
		 * <br><br>
		 * <b>Note:</b> When no placeholder is set, the format pattern is displayed as a placeholder.
		 * Passing an empty string as the value of this property will make the <code>ui5-date-picker</code> appear empty - without placeholder or format pattern.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 */
		placeholder: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Determines the name with which the <code>ui5-date-picker</code> will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-date-picker</code> so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines the visibility of the week numbers column.
		 * <br><br>
		 *
		 * <b>Note:<b> For calendars other than Gregorian,
		 * the week numbers are not displayed regardless of what is set.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		hideWeekNumbers: {
			type: Boolean,
		},

		_isPickerOpen: {
			type: Boolean,
			noAttribute: true,
		},

		_respPopoverConfig: {
			type: Object,
		},

		_calendar: {
			type: Object,
		},
	},

	slots: /** @lends  sap.ui.webcomponents.main.DatePicker.prototype */ {
		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-date-picker</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-date-picker</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement}
		 * @since 1.0.0-rc.7
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},

	events: /** @lends  sap.ui.webcomponents.main.DatePicker.prototype */ {

		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		*/
		change: {},

		/**
		 * Fired when the value of the <code>ui5-date-picker</code> is changed at each key stroke.
		 *
		 * @event
		 * @public
		*/
		input: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-date-picker</code> component provides an input field with assigned calendar which opens on user action.
 * The <code>ui5-date-picker</code> allows users to select a localized date using touch,
 * mouse, or keyboard input. It consists of two parts: the date input field and the
 * date picker.
 *
 * <h3>Usage</h3>
 *
 * The user can enter a date by:
 * <ul>
 * <li>Using the calendar that opens in a popup</li>
 * <li>Typing it in directly in the input field</li>
 * </ul>
 * <br><br>
 * When the user makes an entry and chooses the enter key, the calendar shows the corresponding date.
 * When the user directly triggers the calendar display, the actual date is displayed.
 *
 * <h3>Formatting</h3>
 *
 * If a date is entered by typing it into
 * the input field, it must fit to the used date format.
 * <br><br>
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see <ui5-link target="_blank" href="http://unicode.org/reports/tr35/#Date_Field_Symbol_Table" class="api-table-content-cell-link">UTS #35: Unicode Locale Data Markup Language</ui5-link>.
 * <br><br>
 * For example, if the <code>format-pattern</code> is "yyyy-MM-dd",
 * a valid value string is "2015-07-30" and the same is displayed in the input.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-date-picker</code> provides advanced keyboard handling.
 * If the <code>ui5-date-picker</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * Once the drop-down is opened, you can use the <code>UP</code>, <code>DOWN</code>, <code>LEFT</code>, <code>RIGHT</code> arrow keys
 * to navigate through the dates and select one by pressing the <code>Space</code> or <code>Enter</code> keys. Moreover you can
 * use TAB to reach the buttons for changing month and year.
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DatePicker";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DatePicker
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-date-picker
 * @public
 */
class DatePicker extends UI5Element {
	static get metadata() {
		return metadata$e;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return block0$f;
	}

	static get staticAreaTemplate() {
		return block0$g;
	}

	static get styles() {
		return datePickerCss;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, datePickerPopoverCss];
	}

	constructor() {
		super();

		this._respPopoverConfig = {
			allowTargetOverlap: true,
			stayOpenOnScroll: true,
			afterClose: () => {
				this._isPickerOpen = false;

				if (isPhone()) {
					// close device's keyboard and prevent further typing
					this.blur();
				} else if (this._focusInputAfterClose) {
					this._getInput().focus();
					this._focusInputAfterClose = false;
				}

				const calendar = this.calendar;
				if (calendar) {
					calendar._hideMonthPicker();
					calendar._hideYearPicker();
				}
			},
			afterOpen: () => {
				const calendar = this.calendar;

				if (!calendar) {
					return;
				}

				const dayPicker = calendar.shadowRoot.querySelector(`#${calendar._id}-daypicker`);
				const selectedDay = dayPicker.shadowRoot.querySelector(".ui5-dp-item--selected");
				const today = dayPicker.shadowRoot.querySelector(".ui5-dp-item--now");
				let focusableDay = selectedDay || today;
				if (!selectedDay && (this.minDate || this.maxDate) && !this.isInValidRange((new Date().getTime()))) {
					focusableDay = this.findFirstFocusableDay(dayPicker);
				}

				if (this._focusInputAfterOpen) {
					this._focusInputAfterOpen = false;
					this._getInput().focus();
				} else if (focusableDay) {
					focusableDay.focus();

					let focusableDayIdx = parseInt(focusableDay.getAttribute("data-sap-index"));
					const focusableItem = dayPicker.focusableDays.find(item => parseInt(item._index) === focusableDayIdx);
					focusableDayIdx = focusableItem ? dayPicker.focusableDays.indexOf(focusableItem) : focusableDayIdx;

					dayPicker._itemNav.current = focusableDayIdx;
					dayPicker._itemNav.update();
				}
			},
		};

		this._calendar = {
			onSelectedDatesChange: this._handleCalendarChange.bind(this),
			selectedDates: [],
		};

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	findFirstFocusableDay(daypicker) {
		const today = new Date();
		if (!this.isInValidRange(today.getTime())) {
			const focusableItems = Array.from(daypicker.shadowRoot.querySelectorAll(".ui5-dp-item"));
			return focusableItems.filter(x => !x.classList.contains("ui5-dp-item--disabled"))[0];
		}
	}

	onBeforeRendering() {
		this._calendar.primaryCalendarType = this._primaryCalendarType;
		this._calendar.formatPattern = this._formatPattern;

		if (this.minDate && !this.isValid(this.minDate)) {
			this.minDate = null;
			console.warn(`In order for the "minDate" property to have effect, you should enter valid date format`); // eslint-disable-line
		}

		if (this.maxDate && !this.isValid(this.maxDate)) {
			this.maxDate = null;
			console.warn(`In order for the "maxDate" property to have effect, you should enter valid date format`); // eslint-disable-line
		}
		if (this._checkValueValidity(this.value)) {
			this._changeCalendarSelection();
		} else {
			this._calendar.selectedDates = [];
		}

		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		if (this.minDate) {
			this._calendar.minDate = this.minDate;
		}

		if (this.maxDate) {
			this._calendar.maxDate = this.maxDate;
		}
	}

	_getTimeStampFromString(value) {
		const jsDate = this.getFormat().parse(value);
		if (jsDate) {
			const jsDateTimeNow = new Date(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDateTimeNow.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return undefined;
	}

	_onkeydown(event) {
		if (isShow(event)) {
			event.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
			if (this.isOpen()) {
				if (isF4(event)) {
					if (this.calendar._monthPicker._hidden) {
						this.calendar._showYearPicker();
					}
				} else {
					this._toggleAndFocusInput();
				}
			} else {
				this._toggleAndFocusInput();
			}
		}
	}

	_toggleAndFocusInput() {
		this.togglePicker();
		this._getInput().focus();
	}

	_getInput() {
		return this.shadowRoot.querySelector("ui5-input");
	}

	_handleInputChange() {
		let nextValue = this._getInput().getInputValue();
		const emptyValue = nextValue === "";
		const isValid = emptyValue || this._checkValueValidity(nextValue);

		if (isValid) {
			nextValue = this.normalizeValue(nextValue);
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}


		this.value = nextValue;
		this.fireEvent("change", { value: nextValue, valid: isValid });
		// Angular two way data binding
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
	}

	_handleInputLiveChange() {
		const nextValue = this._getInput().getInputValue();
		const emptyValue = nextValue === "";
		const isValid = emptyValue || this._checkValueValidity(nextValue);

		this.value = nextValue;
		this.fireEvent("input", { value: nextValue, valid: isValid });
	}

	_checkValueValidity(value) {
		return this.isValid(value) && this.isInValidRange(this._getTimeStampFromString(value));
	}

	_click(event) {
		if (isPhone()) {
			this.responsivePopover.open(this);
			event.preventDefault(); // prevent immediate selection of any item
		}
	}

	/**
	 * Checks if a value is valid against the current date format of the DatePicker.
	 * @param {string} value A value to be tested against the current date format
	 * @public
	 */
	isValid(value = "") {
		return !!(value && this.getFormat().parse(value));
	}

	/**
	 * Checks if a date is in range between minimum and maximum date.
	 * @param {object} value
	 * @public
	 */
	isInValidRange(value = "") {
		if (value === "") {
			return true;
		}

		const pickedDate = new Date(value),
			minDate = this._minDate && new Date(this._minDate),
			maxDate = this._maxDate && new Date(this._maxDate);

		if (minDate && maxDate) {
			if (minDate <= pickedDate && maxDate >= pickedDate) {
				return true;
			}
		} else if (minDate && !maxDate) {
			if (minDate <= pickedDate) {
				return true;
			}
		} else if (maxDate && !minDate) {
			if (maxDate >= pickedDate) {
				return true;
			}
		} else if (!maxDate && !minDate) {
			return true;
		}

		return false;
	}

	// because the parser understands more than one format
	// but we need values in one format
	normalizeValue(value) {
		if (value === "") {
			return value;
		}

		return this.getFormat().format(this.getFormat().parse(value));
	}

	get validValue() {
		if (this.isValid(this.value)) {
			return this.value;
		}
		return this.getFormat().format(new Date());
	}

	get calendar() {
		return this.responsivePopover.querySelector(`#${this._id}-calendar`);
	}

	get _calendarDate() {
		const millisecondsUTC = this.getFormat().parse(this.validValue, true).getTime();
		const oCalDate = CalendarDate.fromTimestamp(
			millisecondsUTC - (millisecondsUTC % (24 * 60 * 60 * 1000)),
			this._primaryCalendarType
		);
		return oCalDate;
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType$1() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get _displayFormat() {
		return this.getFormat().oFormatOptions.pattern;
	}

	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
	}

	get _headerTitleText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get phone() {
		return isPhone();
	}

	get showHeader() {
		return this.phone;
	}

	get showFooter() {
		return this.phone;
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
	}

	get accInfo() {
		return {
			"ariaDescribedBy": `${this._id}-date`,
			"ariaHasPopup": "true",
			"ariaAutoComplete": "none",
			"role": "combobox",
			"ariaOwns": `${this._id}-responsive-popover`,
			"ariaExpanded": this.isOpen(),
			"ariaDescription": this.dateAriaDescription,
		};
	}

	get _maxDate() {
		if (this.maxDate) {
			return this._getTimeStampFromString(this.maxDate);
		}
		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			return this._getTimeStampFromString(this.minDate);
		}
		return this.minDate;
	}

	get openIconTitle() {
		return this.i18nBundle.getText(DATEPICKER_OPEN_ICON_TITLE);
	}

	get openIconName() {
		return "appointment-2";
	}

	get dateAriaDescription() {
		return this.i18nBundle.getText(DATEPICKER_DATE_ACC_TEXT);
	}

	/**
	 * Defines whether the dialog on mobile should have header
	 * @private
	 */
	get _shouldHideHeader() {
		return false;
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("ui5-responsive-popover");
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	_handleCalendarChange(event) {
		const iNewValue = event.detail.dates && event.detail.dates[0];

		if (this._calendar.selectedDates.indexOf(iNewValue) !== -1) {
			this.closePicker();
			return false;
		}

		const fireChange = this._handleCalendarSelectedDatesChange(event, iNewValue);

		if (fireChange) {
			this.fireEvent("change", { value: this.value, valid: true });
			// Angular two way data binding
			this.fireEvent("value-changed", { value: this.value, valid: true });
		}

		this.closePicker();
	}

	_handleCalendarSelectedDatesChange(event, newValue) {
		this._updateValueCalendarSelectedDatesChange(newValue);

		this._calendar.timestamp = newValue;
		this._calendar.selectedDates = event.detail.dates;
		this._focusInputAfterClose = true;

		if (this.isInValidRange(this._getTimeStampFromString(this.value))) {
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}

		return true;
	}

	_updateValueCalendarSelectedDatesChange(newValue) {
		this.value = this.getFormat().format(
			new Date(CalendarDate.fromTimestamp(
				newValue * 1000,
				this._primaryCalendarType
			).valueOf()),
			true
		);
	}

	/**
	 * Formats a Java Script date object into a string representing a locale date
	 * according to the <code>formatPattern</code> property of the DatePicker instance
	 * @param {object} oDate A Java Script date object to be formatted as string
	 * @public
	 */
	formatValue(oDate) {
		return this.getFormat().format(oDate);
	}

	/**
	 * Closes the picker.
	 * @public
	 */
	closePicker() {
		this.responsivePopover.close();
	}

	/**
	 * Opens the picker.
	 * @param {object} options A JSON object with additional configuration.<br>
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	async openPicker(options) {
		this._isPickerOpen = true;
		this.responsivePopover = await this._respPopover();
		this._changeCalendarSelection();

		if (options && options.focusInput) {
			this._focusInputAfterOpen = true;
		}

		this.responsivePopover.open(this);
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.updateStaticAreaItemContentDensity();
			this.openPicker();
		}
	}

	_changeCalendarSelection(focusTimestamp) {
		if (this._calendarDate.getYear() < 1) {
			// 0 is a valid year, but we cannot display it
			return;
		}

		const oCalDate = this._calendarDate;
		const timestamp = focusTimestamp || oCalDate.valueOf() / 1000;

		this._calendar = Object.assign({}, this._calendar);
		this._calendar.timestamp = timestamp;
		if (this.value) {
			this._calendar.selectedDates = [timestamp];
		}
	}

	/**
	 * Checks if the picker is open.
	 * @returns {Boolean} true if the picker is open, false otherwise
	 * @public
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	/**
	 * Gets some semantic details about an event originated in the control.
	 * @param {*} event An event object
	 * @returns {Object} Semantic details
	 */
	getSemanticTargetInfo(event) {
		const oDomTarget = getDomTarget(event);
		let isInput = false;

		if (oDomTarget && oDomTarget.className.indexOf("ui5-input-inner") > -1) {
			isInput = true;
		}

		return { isInput };
	}

	/**
	 * Currently selected date represented as JavaScript Date instance.
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get dateValue() {
		return this.getFormat().parse(this.value);
	}

	get styles() {
		return {
			main: {
				width: "100%",
			},
		};
	}

	get type() {
		return InputType.Text;
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			Icon.define(),
			ResponsivePopover.define(),
			Calendar.define(),
			Input.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

const getDomTarget = event => {
	let target,
		composedPath;

	if (typeof event.composedPath === "function") {
		composedPath = event.composedPath();
	}

	if (Array.isArray(composedPath) && composedPath.length) {
		target = composedPath[0];
	}

	return target;
};

DatePicker.define();

export default DatePicker;
