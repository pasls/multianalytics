import AnalyticsPlugin from './AnalyticsPlugin'
import GAModule from './modules/GAModule'
import MixpanelModule from './modules/MixpanelModule'
import SegmentModule from './modules/SegmentModule'
import FacebookModule from './modules/FacebookModule'
import MparticleModule from './modules/MparticleModule'
import * as Utils from './utils'
import * as types from './analyticsTypes'

const customModules = {}

/**
 * Installation procedure
 *
 * @param Vue
 * @param initConf
 */


const init = function ( initConf = {}, mixin) {
  // init Google Analytics
  // We create all the modules that app will use
  const modulesEnabled = []
  for (let key in initConf.modules) {
    let module
    switch (key) {
      case types.MODULE_GA:
        module = new GAModule()
        module.init(initConf.modules[key])
        break;
      case types.MODULE_MIXPANEL:
        module = new MixpanelModule()
        module.init(initConf.modules[key])
        break;
      case types.MODULE_SEGMENT:
        module = new SegmentModule()
        module.init(initConf.modules[key])
        break;
      case types.MODULE_FACEBOOK:
        module = new FacebookModule()
        module.init(initConf.modules[key])
        break;
      case types.MODULE_MPARTICLE:
        module = new MparticleModule()
        module.init(initConf.modules[key])
      default:
        break;
    }
    if (module) {
      modulesEnabled.push(module)
    }
  } 

  if (Object.keys(customModules).length > 0) {
    Object.values(customModules).forEach((module, index) => {
      let moduleInstance = new module()
      moduleInstance.init(initConf.modules[Object.keys(customModules)[index]])
      modulesEnabled.push(moduleInstance)
    })
  }

  // Add to vue prototype and also from globals
  return new AnalyticsPlugin(modulesEnabled)
}

const addCustomModule = function (name, module) {
  customModules[name] = module
}


// Export module
export default { init, addCustomModule }
