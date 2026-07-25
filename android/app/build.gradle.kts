plugins {
    alias(libs.plugins.android.application)
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(24))
    }
}

android {
    namespace = "ru.asavan.quadripple"
    compileSdk = 37

    defaultConfig {
        applicationId = "ru.asavan.quadripple"
        minSdk = 23
        targetSdk = 37
        versionCode = 2
        versionName = "1.1.1"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    packaging {
        jniLibs {
            pickFirsts += "META-INF/nanohttpd/*"
        }
        resources {
            pickFirsts += "META-INF/nanohttpd/*"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

dependencies {

    implementation(libs.nanohttpd)
    implementation(libs.androidbrowserhelper)

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}
