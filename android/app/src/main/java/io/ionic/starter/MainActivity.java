package io.ionic.starter;

import android.os.Bundle;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {

    this.registerPlugin(GoogleAuth.class);
    super.onCreate(savedInstanceState);
  }

  private void init(Bundle savedInstanceState, ArrayList<Class<? extends Plugin>> classes) {
  }

}
