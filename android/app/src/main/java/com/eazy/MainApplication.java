package com.eazy;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import cl.json.RNSharePackage;
import com.airbnb.android.react.maps.MapsPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.rjblopes.opensettings.OpenSettingsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.krazylabs.OpenAppSettingsPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.rnfs.RNFSPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGooglePlacesPackage(),
            new RNSharePackage(),
            new MapsPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNI18nPackage(),
            new FacebookLoginPackage(),
            new OpenSettingsPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new OpenAppSettingsPackage(),
            new RNGeocoderPackage(),
            new RNFirebasePackage(),
            new FIRMessagingPackage(),
            new ReactNativeRestartPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNFSPackage(),
            new SnackbarPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
