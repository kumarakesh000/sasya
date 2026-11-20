plugins { id("com.android.application") }

val ksFile: String? = System.getenv("KS_FILE")
val buildNo = (System.getenv("GITHUB_RUN_NUMBER") ?: "1").toInt()

android {
    namespace = "com.cornerlabs.sasya"
    compileSdk = 34
    defaultConfig {
        applicationId = "com.cornerlabs.sasya"
        minSdk = 26
        targetSdk = 34
        versionCode = buildNo
        versionName = "1.0.$buildNo"
    }
    signingConfigs {
        create("release") {
            if (ksFile != null) {
                storeFile = file(ksFile)
                storeType = "pkcs12"
                storePassword = System.getenv("KS_PASS")
                keyAlias = "sasya"
                keyPassword = System.getenv("KS_PASS")
            }
        }
    }
    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName(if (ksFile != null) "release" else "debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("androidx.webkit:webkit:1.11.0")
    implementation("androidx.core:core:1.13.1")
}
