///
/// HybridUnistylesStyleSheetSpec.cpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#include "HybridUnistylesStyleSheetSpec.hpp"

namespace margelo::nitro::unistyles {

  void HybridUnistylesStyleSheetSpec::loadHybridMethods() {
    // load base methods/properties
    HybridObject::loadHybridMethods();
    // load custom methods/properties
    registerHybrids(this, [](Prototype& prototype) {
      prototype.registerHybridGetter("hairlineWidth", &HybridUnistylesStyleSheetSpec::getHairlineWidth);
      prototype.registerHybridGetter("unid", &HybridUnistylesStyleSheetSpec::getUnid);
    });
  }

} // namespace margelo::nitro::unistyles
