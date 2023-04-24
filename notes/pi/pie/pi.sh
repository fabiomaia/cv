#!/bin/sh
set -ex

v="android-ndk-r25b"
test -d $HOME/$v || (curl -fsSLO https://dl.google.com/android/repository/$v-linux.zip && unzip *.zip)

NDK="$HOME/$v"

$NDK/toolchains/llvm/prebuilt/linux-x86_64/bin/aarch64-linux-android31-clang pi.c -o pi_android31_aarch64
$NDK/toolchains/llvm/prebuilt/linux-x86_64/bin/aarch64-linux-android32-clang pi.c -o pi_android32_aarch64
gcc pi.c -o pi_ubuntu_x86_64

file pi_android31_aarch64
file pi_android32_aarch64
file pi_ubuntu_x86_64
