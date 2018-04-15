import { $ } from './utils'
import { fetchJson } from './fetch'

const render = Symbol('render')
const event = Symbol('event')

class Region {
  constructor(opts) {
    if (!opts.container) {
      throw '请填写container配置'
    }
    if (!opts.name) {
      throw '请填写name配置'
    }
    this[render](opts)
    this[event](opts)
  }

  async [render](opts) {
    const tpl = `
      <div class="region-select-wrapper">
        <select id="region-province-select"></select>
        <select id="region-city-select"></select>
        <select id="region-area-select"></select>
        <input id="region-selected" type="hidden" name="${opts.name}" valid="${opts.present ? 'present' : ''}" />
      </div>
    `
    opts.container.innerHTML = tpl
  }

  async [event](opts) {
    let regionData = await fetchJson('/region-data', {})
    regionData = regionData.data

    const $provinceSelect = $('region-province-select')
    const $citySelect = $('region-city-select')
    const $areaSelect = $('region-area-select')
    const $result = $('region-selected')

    let provinceSelected, citySelected, areaSelected

    let provinceOptions = '<option></option>'

    for(let item of regionData) {
      provinceOptions += `<option value="${item.id}">${item.name}</option>`
    }

    $provinceSelect.innerHTML = provinceOptions

    const provinceChange = (index) => {
      const i = index ? index : parseInt($provinceSelect.value)
      const cities = regionData[i - 1].city
      let cityOptions = ''
      provinceSelected = i
      for (let item of cities) {
        cityOptions += `<option value="${item.id}">${item.name}</option>`
      }
      $citySelect.innerHTML = cityOptions
      index && ($provinceSelect.value = index)
    }

    const cityChange = (index) => {
      let areas = regionData[provinceSelected - 1].city.filter(item => {
        return item.id === parseInt($citySelect.value)
      })[0].district
      let areaOptions = ''
      citySelected = $citySelect.value
      for (let item of areas) {
        areaOptions += `<option value="${item.id}">${item.name}</option>`
      }
      $areaSelect.innerHTML = areaOptions
      index && ($citySelect.value = index)
    }

    const areaChange = (index) => {
      areaSelected = parseInt($areaSelect.value)
      $result.value = provinceSelected + ',' + citySelected + ',' + areaSelected
      index && ($areaSelect.value = index)
    }

    if (opts.initData && Array.isArray(opts.initData)) {
      const data =  opts.initData
      data[0] && provinceChange(data[0])
      data[1] && cityChange(data[1])
      data[2] && areaChange(data[2])
    }

    $provinceSelect.onchange = () => {
      provinceChange()
      cityChange()
      areaChange()
    }

    $citySelect.onchange = () => {
      cityChange()
      areaChange()
    }

    $areaSelect.onchange = () => {
      areaChange()
    }
  }
}

export default Region
