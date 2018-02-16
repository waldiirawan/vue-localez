/**
* Defines the Localez Class
* @method vueLocalez
* @param  {object} options
*/
const vueLocalez = function (options) {
    /**
     * This object options for localez
     * @type {object}
     */
    const opts = options || {}
    /**
    * This value if using different language
    * @type {string}
    */
    this.activevueLocalez = opts.lang || 'en'
    /**
    * This value if using different extension
    * @type {string}
    */
    this.extensionvueLocalez = opts.extension || 'json'
    /**
    * For lang sources
    * @type {Object}
    */
    this.langSources = {}
    /**
     * For Formatting number
     * @type {Object}
     */
    this.fNumbOpt = opts.formatNumber || {}
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
vueLocalez.requireAll = function (rC) {
    rC.keys().forEach((file) => {
        vueLocalez.sources[file] = rC(file)
    })
}

/**
 * This method is used to set the current language.
 * @method for
 * @param  {string} isoCode
 */
vueLocalez.prototype.for = function (isoCode) {
    this.activevueLocalez = isoCode
    this.langSources = {}
    this.saveTovueLocalezSources()
}

/**
 * Saving all json to obj
 * @method saveTovueLocalezSources
 */
vueLocalez.prototype.saveTovueLocalezSources = function () {
    Object.keys(vueLocalez.sources).forEach(prop => {
        if (prop.indexOf('./' + this.activevueLocalez + '/') === 0) {
            const langCode = prop.replace('./' + this.activevueLocalez + '/', '').replace('.' + this.extensionvueLocalez + '', '')
            this.langSources[langCode] = vueLocalez.sources[prop]
        }
    })
}

/**
 * Get active language
 * @method getvueLocalez
 */
vueLocalez.prototype.getvueLocalez = function () {
    return this.activevueLocalez
}

/**
 * [message description]
 * @method message
 * @param  {object} prop
 * @param  {object} attributes
 */
vueLocalez.prototype.message = function (prop, attributes) {
    const attr = attributes || {}
    if (typeof attr === 'undefined') {
        return false
    }
    let value = this.fetchFromObject(this.langSources, prop)

    for (const propAttr of Object.keys(attr)) {
        value = value.replace('{' + propAttr + '}', attributes[propAttr])
    }
    return value
}

/**
 * Fetch from object to string
 * @method fetchFromObject
 * @param  {object}  obj
 * @param  {object} prop
 */
vueLocalez.prototype.fetchFromObject = function (obj, prop) {
    /**
     *
     */
    if (typeof obj === 'undefined') {
        return false
    }
    /**
     *
     */
    const index = prop.indexOf('.')
    if (index > -1) {
        return this.fetchFromObject(obj[prop.substring(0, index)], prop.substr(index + 1))
    }
    return obj[prop]
}

/**
 * The vueLocalez.prototype.formatNumber is a constructor for Intl.NumberFormat objects that enable language sensitive number formatting.
 * @method formatNumber
 * @param  {number}     number
 * @param  {object}     options
 * @return {string}
 */
vueLocalez.prototype.formatNumber = function (number, options) {
    return new Intl.NumberFormat(this.activevueLocalez, options || this.fNumbOpt).format(number)
}

/**
 * Install plugin for Vue
 * @method install
 * @param  {object} Vue
 * @param  {object} options
 */
vueLocalez.install = function (Vue, options) {
    /**
     *
     */
    const obj = options || {}
    /**
     *
     */
    if (typeof obj !== 'object') {
        console.error('[vue-lang] the options should be an object type.')
        return false
    }
    /**
     *
     * @type {function}
     */
    Object.defineProperty(Vue.prototype, '$locale', {
        get() { return this.$root.vlocale }
    })
    /**
     *
     * @type {function}
     */
    Vue.mixin({
        beforeCreate() {
            Vue.util.defineReactive(this, 'vlocale', new vueLocalez(
                options
            ))
        }
    })
    return true
}

module.exports = vueLocalez
