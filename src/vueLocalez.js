/**
* Defines the Localez Class
* @method vueLocalez
* @param  {object} options
*/
var vueLocalez = function(options) {
    /**
     * This object options for localez
     * @type {object}
     */
    var options = options || {}
    /**
    * This value if using different language
    * @type {string}
    */
    this.activevueLocalez = options.lang || 'en'
    /**
    * This value if using different extension
    * @type {string}
    */
    this.extensionvueLocalez = options.extension || 'json'
    /**
    * For lang sources
    * @type {Object}
    */
    this.langSources = {}
    /**
     *  Sets the current lang
     */
    this.for(this.activevueLocalez)
}

/**
 * This static object for saving all language files
 * @type {Object}
 */
vueLocalez.sources = {}

/**
 * Get all language files
 * @method requireAll
 * @param  {function} rC
 */
vueLocalez.requireAll = function(rC) {
    rC.keys().forEach(function(file){
        vueLocalez.sources[file] = rC(file)
    })
}

/**
 * This method is used to set the current language.
 * @method for
 * @param  {string} isoCode
 */
vueLocalez.prototype.for = function(isoCode) {
    this.activevueLocalez = isoCode
    this.langSources = {}
    this.saveTovueLocalezSources()
}

/**
 * Saving all json to obj
 * @method saveTovueLocalezSources
 */
vueLocalez.prototype.saveTovueLocalezSources = function() {
    for(var prop in vueLocalez.sources) {
        if(prop.indexOf(`./${this.activevueLocalez}/`) === 0){
            var langCode = prop.replace(`./${this.activevueLocalez}/`, '').replace(`.${this.extensionvueLocalez}`, '')
            this.langSources[langCode] = vueLocalez.sources[prop]
        }
    }
}

/**
 * Get active language
 * @method getvueLocalez
 */
vueLocalez.prototype.getvueLocalez = function() {
    return this.activevueLocalez
}

/**
 * [message description]
 * @method message
 * @param  {object} prop
 * @param  {object} attributes
 */
vueLocalez.prototype.message = function(prop, attributes) {
    var attr = attributes || {}
    if(typeof attr === 'undefined') {
        return false;
    }
    var value = this.fetchFromObject(this.langSources, prop)
    for(var propAttr in attributes) {
        value = value.replace(`{${propAttr}}`, attributes[propAttr])
    }
    return value
}

/**
 * Fetch from object to string
 * @method fetchFromObject
 * @param  {object}  obj
 * @param  {object} prop
 */
vueLocalez.prototype.fetchFromObject = function(obj, prop) {
    /**
     *
     */
    if(typeof obj === 'undefined') {
        return false;
    }
    /**
     *
     */
    var _index = prop.indexOf('.')
    if(_index > -1) {
        return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }
    return obj[prop];
}

/**
 * Install plugin for Vue
 * @method install
 * @param  {object} Vue
 * @param  {object} options
 */
vueLocalez.install = function(Vue, options){
    /**
     *
     */
    var obj = options || {}
    /**
     *
     */
    if(typeof obj != 'object'){
        console.error('[vue-lang] the options should be an object type.')
        return false
    }
    /**
     *
     * @type {function}
     */
    Object.defineProperty(Vue.prototype, '$locale', {
        get () { return this.$root._locale }
    })
    /**
     *
     * @type {function}
     */
    Vue.mixin({
        beforeCreate () {
            Vue.util.defineReactive(this, '_locale', new vueLocalez(
                options
            ))
        }
    })
}

module.exports = vueLocalez
