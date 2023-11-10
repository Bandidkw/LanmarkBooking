<!-- eslint-disable prettier/prettier -->
<template>
  <card>
    <template slot="header">
      <h2 class="title mt-3">รายละเอียดโรงแรม</h2>
    </template>
    <div class="row">
      <div class="col-md-5 pr-md-1 text-left">
        <base-input
          label="ชื่อโรงแรม"
          placeholder="ชื่อโรงแรม"
          v-model="model.name"
          disabled
        >
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1 text-left">
        <base-input
          label="Email address"
          type="email"
          placeholder="email@email.com"
          disabled
        >
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 pr-md-1 text-left">
        <base-input
          label="ชื่อ"
          v-model="model.firstName"
          placeholder="First Name"
          disabled
        >
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1 text-left">
        <base-input
          label="นามสกุล"
          v-model="model.lastName"
          placeholder="Last Name"
          disabled
        >
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input
          label="ที่อยู่"
          v-model="model.address"
          placeholder="ชื่ออยู่"
        >
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 pr-md-1 text-left">
        <base-input label="ตำบล" v-model="model.city" placeholder="ตำบล">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1 text-left">
        <base-input label="อำเภอ" v-model="model.city" placeholder="อำเภอ">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1 text-left">
        <base-input label="จังหวัด" v-model="model.city" placeholder="จังหวัด">
        </base-input>
      </div>
    
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1 text-left">
        <base-input
          label="ประเทศ"
          v-model="model.country"
          placeholder="Country"
        >
        </base-input>
      </div>
      <div class="col-md-4 px-md-1 text-left">
        <base-input label="เลขไปรษณีย์" placeholder="เลขไปรษณีย์"> </base-input>
      </div>
    </div>

    <div class="row">

      <div class="col-md-8 text-left">
        <base-input>
          <label>รายละเอียดเกี่ยวกับโรงแรม</label>
          <textarea
            rows="4"
            cols="80"
            class="form-control"
            placeholder="Here can be your description"
            v-model="model.about"
          >
          </textarea>
        </base-input>
      </div>
    </div>
    <template slot="footer">
      <base-button type="success" fill>Save</base-button>
    </template>
  </card>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { Card, BaseInput } from "@/components/index";

import BaseButton from "@/components/BaseButton";

export default {
  components: {
    Card,
    BaseInput,
    BaseButton,
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style></style>
