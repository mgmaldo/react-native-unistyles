import { pluginTester } from 'babel-plugin-tester'
import plugin from '../'

pluginTester({
    plugin,
    pluginOptions: {
        debug: false
    },
    babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx'],
        generatorOpts: {
            retainLines: true
        }
    },
    tests: [
        {
            title: 'Should detect dependencies in variants',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: {
                        variants: {
                            size: {
                                small: {
                                    backgroundColor: theme.colors.blue,
                                    paddingTop: theme.gap(10),
                                    marginBottom: rt.insets.bottom === 0
                                        ? theme.gap(20)
                                        : theme.gap(30)
                                }
                            }
                        }
                    }
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: {
                            variants: {
                                size: {
                                    small: {
                                        backgroundColor: theme.colors.blue,
                                        paddingTop: theme.gap(10),
                                        marginBottom: rt.insets.bottom === 0 ? theme.gap(20) : theme.gap(30)
                                    }
                                }
                            },
                            uni__dependencies: [0, 9, 4]
                        }
                    }),
                    664955283
                )
            `
        },
        {
            title: 'Should detect dependencies in breakpoints',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: {
                        backgroundColor: {
                            sm: theme.colors.blue
                        },
                        padding: {
                            xs: rt.insets.top
                        }
                    }
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: {
                            backgroundColor: {
                                sm: theme.colors.blue
                            },
                            padding: {
                                xs: rt.insets.top
                            },
                            uni__dependencies: [0, 9]
                        }
                    }),
                    664955283
                )
            `
        },
        {
            title: 'Should detect dependencies in calculations',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: {
                        marginTop: theme.gap(2) + rt.insets.bottom,
                        marginBottom: theme.gap(2) * rt.statusBar.height,
                        paddingTop: theme.gap(2) - rt.navigationBar.height
                    }
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: {
                            marginTop: theme.gap(2) + rt.insets.bottom,
                            marginBottom: theme.gap(2) * rt.statusBar.height,
                            paddingTop: theme.gap(2) - rt.navigationBar.height,
                            uni__dependencies: [0, 9, 12, 13]
                        }
                    }),
                    664955283
                )
            `
        },
        {
            title: 'Should detect dependencies in _web',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: {
                        flex: 1,
                        display: 'flex'
                    },
                    static: {
                        backgroundColor: 'pink'
                    },
                    staticText: {
                        color: 'red'
                    },
                    theme: {
                        backgroundColor: theme.colors.backgroundColor
                    },
                    themeText: {
                        color: theme.colors.typography
                    },
                    themeButtonsContainer: {
                        marginTop: 20,
                        flexDirection: 'row',
                        gap: 10
                    },
                    dynamic: state => ({
                        backgroundColor: state % 2 === 0 ? theme.colors.fog : theme.colors.oak
                    }),
                    whiteText: {
                        color: 'white',
                        textAlign: 'center'
                    },
                    hover: {
                        backgroundColor: theme.colors.blood,
                        cursor: 'pointer',
                        _web: {
                            _hover: {
                                backgroundColor: theme.colors.sky,
                                paddingTop: rt.insets.top
                            }
                        }
                    },
                    breakpoint: {
                        backgroundColor: {
                            xs: theme.colors.blood,
                            md: theme.colors.sky,
                            xl: theme.colors.aloes
                        },
                        transform: [
                            {
                                translateX: {
                                    xs: rt.fontScale * 10,
                                    md: rt.pixelRatio * 10
                                }
                            }
                        ],
                        position: 'relative',
                        _web: {
                            _after: {
                                fontWeight: 'bold',
                                content: rt.breakpoint,
                                color: 'white',
                                position: 'absolute',
                                top: '60%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: rt.colorScheme === 'dark' ? 'black' : 'white'
                            }
                        }
                    }
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: {
                            flex: 1,
                            display: 'flex'
                        },
                        static: {
                            backgroundColor: 'pink'
                        },
                        staticText: {
                            color: 'red'
                        },
                        theme: {
                            backgroundColor: theme.colors.backgroundColor,
                            uni__dependencies: [0]
                        },
                        themeText: {
                            color: theme.colors.typography,
                            uni__dependencies: [0]
                        },
                        themeButtonsContainer: {
                            marginTop: 20,
                            flexDirection: 'row',
                            gap: 10
                        },
                        dynamic: state => ({
                            backgroundColor: state % 2 === 0 ? theme.colors.fog : theme.colors.oak,
                            uni__dependencies: [0]
                        }),
                        whiteText: {
                            color: 'white',
                            textAlign: 'center'
                        },
                        hover: {
                            backgroundColor: theme.colors.blood,
                            cursor: 'pointer',
                            _web: {
                                _hover: {
                                    backgroundColor: theme.colors.sky,
                                    paddingTop: rt.insets.top
                                }
                            },
                            uni__dependencies: [0, 9]
                        },
                        breakpoint: {
                            backgroundColor: {
                                xs: theme.colors.blood,
                                md: theme.colors.sky,
                                xl: theme.colors.aloes
                            },
                            transform: [
                                {
                                    translateX: {
                                        xs: rt.fontScale * 10,
                                        md: rt.pixelRatio * 10
                                    }
                                }
                            ],

                            position: 'relative',
                            _web: {
                                _after: {
                                    fontWeight: 'bold',
                                    content: rt.breakpoint,
                                    color: 'white',
                                    position: 'absolute',
                                    top: '60%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: rt.colorScheme === 'dark' ? 'black' : 'white'
                                }
                            },
                            uni__dependencies: [0, 11, 10, 3, 5]
                        }
                    }),
                    664955283
                )
            `
        },
        {
            title: 'Should allow user to use arrow functions with body for dynamic functions',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: () => {
                        const b = 2 + 2

                        return {
                            backgroundColor: {
                                sm: theme.colors.blue
                            },
                            padding: {
                                xs: rt.insets.top + b
                            }
                        }
                    }
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: () => {
                            const b = 2 + 2

                            return {
                                backgroundColor: {
                                    sm: theme.colors.blue
                                },
                                padding: {
                                    xs: rt.insets.top + b
                                },
                                uni__dependencies: [0, 9]
                            }
                        }
                    }),
                    664955283
                )
            `
        },
        {
            title: 'Should correctly detect IME insets dependency',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: {
                        backgroundColor: theme.colors.background,
                        paddingBottom: rt.insets.ime
                    }
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: {
                            backgroundColor: theme.colors.background,
                            paddingBottom: rt.insets.ime,
                            uni__dependencies: [0, 14]
                        }
                    }),
                    664955283
                )
            `
        },
        {
            title: 'Should correctly detect dependency from Array accessor',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: (headerColors, colorMap) => ({
                        backgroundColor: headerColors[rt.colorScheme],
                        paddingBottom: colorMap[theme.colors.primary]
                    })
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: (headerColors, colorMap) => ({
                            backgroundColor: headerColors[rt.colorScheme],
                            paddingBottom: colorMap[theme.colors.primary],
                            uni__dependencies: [5, 0]
                        })
                    }),
                    664955283
                )
            `
        },
        {
            title: 'Should correctly detect dependency from unary operator',
            code: `
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View style={styles.container}>
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create((theme, rt) => ({
                    container: {
                        transform: [
                            {
                                translateY: -rt.insets.ime
                            }
                        ]
                    }
                }))
            `,
            output: `
                import { UnistylesShadowRegistry } from 'react-native-unistyles'
                import { View, Text } from 'react-native'
                import { StyleSheet } from 'react-native-unistyles'

                export const Example = () => {
                    return (
                        <View
                            style={[styles.container]}
                            ref={ref => {
                                UnistylesShadowRegistry.add(ref, [styles.container], undefined, [[]])
                                return () => UnistylesShadowRegistry.remove(ref)
                            }}
                        >
                            <Text>Hello world</Text>
                        </View>
                    )
                }

                const styles = StyleSheet.create(
                    (theme, rt) => ({
                        container: {
                            transform: [
                                {
                                    translateY: -rt.insets.ime
                                }
                            ],
                            uni__dependencies: [9]
                        }
                    }),
                    664955283
                )
            `
        },
    ]
})
