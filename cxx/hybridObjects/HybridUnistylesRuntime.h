#pragma once

#include "HybridUnistylesRuntimeSpec.hpp"
#include "HybridNativePlatformSpec.hpp"
#include "Unistyles-Swift-Cxx-Umbrella.hpp"
#include "UnistylesState.h"
#include "HybridUnistylesStatusBarSpec.hpp"
#include "HybridNavigationBar.h"
#include "HybridStatusBar.h"
#include "Helpers.h"

namespace margelo::nitro::unistyles {

struct HybridUnistylesRuntime: public HybridUnistylesRuntimeSpec {
    HybridUnistylesRuntime(Unistyles::HybridNativePlatformSpecCxx nativePlatform, jsi::Runtime& rt)
        : HybridObject(TAG), _nativePlatform{nativePlatform}, _rt{&rt}, _state(std::make_unique<core::UnistylesState>(&rt)) {}
    
    jsi::Value updateTheme(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value createHybridStatusBar(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value createHybridNavigationBar(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    
    void loadHybridMethods() override {
        HybridUnistylesRuntimeSpec::loadHybridMethods();
        
        registerHybrids(this, [](Prototype& prototype) {
            prototype.registerRawHybridMethod("updateTheme", 1, &HybridUnistylesRuntime::updateTheme);
            prototype.registerRawHybridMethod("createHybridStatusBar", 0, &HybridUnistylesRuntime::createHybridStatusBar);
            prototype.registerRawHybridMethod("createHybridNavigationBar", 0, &HybridUnistylesRuntime::createHybridNavigationBar);
        });
    };
    
    ColorScheme getColorScheme() override;
    bool getHasAdaptiveThemes() override;
    bool getRtl() override;
    Dimensions getScreen() override;
    std::optional<std::string> getThemeName() override;
    std::string getContentSizeCategory() override;
    std::optional<std::string> getBreakpoint() override;
    Insets getInsets() override;
    Orientation getOrientation() override;
    double getPixelRatio() override;
    double getFontScale() override;
    
    void setTheme(const std::string &themeName) override;
    void setAdaptiveThemes(bool isEnabled) override;
    void setImmersiveMode(bool isEnabled) override;
    void setRootViewBackgroundColor(std::optional<double> color) override;

private:
    jsi::Runtime* _rt;
    std::shared_ptr<HybridNavigationBar> _navigationBar;
    std::shared_ptr<HybridStatusBar> _statusBar;
    std::unique_ptr<core::UnistylesState> _state;
    Unistyles::HybridNativePlatformSpecCxx _nativePlatform;
};

}
