import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import NtpForm from "./NtpForm";

const mockStore = configureStore();

describe("NtpForm", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      config: {
        loading: false,
        loaded: true,
        items: [
          {
            name: "ntp_external_only",
            value: false
          },
          { name: "ntp_servers", value: "" }
        ]
      }
    };
  });

  it("displays a spinner if config is loading", () => {
    const state = { ...initialState };
    state.config.loading = true;
    const store = mockStore(state);

    const wrapper = mount(
      <Provider store={store}>
        <NtpForm />
      </Provider>
    );

    expect(wrapper.find("Loader").exists()).toBe(true);
  });

  it("dispatches an action to update config on save button click", done => {
    const state = { ...initialState };
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <NtpForm />
      </Provider>
    );
    wrapper.find("form").simulate("submit");

    // since Formik handler is evaluated asynchronously we have to delay checking the assertion
    window.setTimeout(() => {
      expect(store.getActions()).toEqual([
        {
          type: "UPDATE_CONFIG",
          payload: {
            params: [
              {
                name: "ntp_external_only",
                value: false
              },
              { name: "ntp_servers", value: "" }
            ]
          },
          meta: {
            method: "config.update",
            type: 0
          }
        }
      ]);
      done();
    }, 0);
  });
});