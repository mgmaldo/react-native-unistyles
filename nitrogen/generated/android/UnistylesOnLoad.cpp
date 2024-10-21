///
/// unistylesOnLoad.cpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#include "unistylesOnLoad.hpp"

#include <jni.h>
#include <fbjni/fbjni.h>
#include <NitroModules/HybridObjectRegistry.hpp>

#include "JHybridNativePlatformSpec.hpp"
#include "JFunc_void_std__vector_UnistyleDependency_.hpp"

namespace margelo::nitro::unistyles {

int initialize(JavaVM* vm) {
  using namespace margelo::nitro;
  using namespace margelo::nitro::unistyles;
  using namespace facebook;

  return facebook::jni::initialize(vm, [] {
    // Register native JNI methods
    margelo::nitro::unistyles::JHybridNativePlatformSpec::registerNatives();
    margelo::nitro::unistyles::JFunc_void_std__vector_UnistyleDependency_::registerNatives();

    // Register Nitro Hybrid Objects
    
  });
}

} // namespace margelo::nitro::unistyles
