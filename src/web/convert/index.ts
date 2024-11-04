import type { UnistylesValues } from '../../types'
import { isPseudo } from './pseudo'
import { getStyle } from './style'
import { deepMergeObjects } from '../utils'
import { getTransformStyle, getBoxShadow, getFilterStyle } from './object'
import { isShadow, isFilter, isTextShadow, isTransform, isBoxShadow } from './utils'
import { getTextShadowStyle, getBoxShadowStyle } from './shadow'

export const convertUnistyles = (value: UnistylesValues) => {
    // Flag to mark if textShadow is already created
    let hasTextShadow = false
    // Flag to mark if boxShadow is already created
    let hasBoxShadow = false

    const stylesArray = Object.entries({
        ...value,
        ...value._web
    }).flatMap(([unistylesKey, unistylesValue]) => {
        // Keys to omit
        if (['_classNames', '_web', 'variants', 'compoundVariants', 'uni__dependencies', '__unistyles-secrets__'].includes(unistylesKey) || unistylesKey.startsWith('variant-')) {
            return []
        }

        // Pseudo classes :hover, :before etc.
        if (isPseudo(unistylesKey)) {
            const flattenValues = convertUnistyles(unistylesValue as UnistylesValues)

            return { [unistylesKey]: flattenValues }
        }

        // Text shadow
        if (isTextShadow(unistylesKey)) {
            if (hasTextShadow) {
                return []
            }

            hasTextShadow = true

            return getTextShadowStyle(value)
        }

        // Box shadow
        if (isShadow(unistylesKey)) {
            if (hasBoxShadow) {
                return []
            }

            hasBoxShadow = true

            return getBoxShadowStyle(value)
        }

        if (isFilter(unistylesKey, unistylesValue)) {
            return getFilterStyle(unistylesValue)
        }

        if (isBoxShadow(unistylesKey, unistylesValue)) {
            return getBoxShadow(unistylesValue)
        }

        // Transforms
        if (isTransform(unistylesKey, unistylesValue)) {
            return getTransformStyle(unistylesValue)
        }

        // Breakpoints
        if (typeof unistylesValue === 'object' && unistylesValue !== null) {
            return Object.entries(unistylesValue).map(([breakpointKey, breakpointValue]) => {
                return { [breakpointKey]: getStyle(unistylesKey, breakpointValue) }
            })
        }

        // Regular styles
        return getStyle(unistylesKey, unistylesValue)
    }) as Array<Record<string, any>>

    return deepMergeObjects(...stylesArray)
}
