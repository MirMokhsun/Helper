export const filterEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const filterName = /(?=(^[^<>()\[\]\\.,;:\s@"#'!?$%^&*_=+-]))[^<>()\[\]\\.,;:@"#!?$%^&*_=+]{0,199}([^<>()\[\]\\.,;:\s@"#!?$%'^&*_=+-]$)/;

export const filterPhone = /^(([0-9+\-()]){6,24})$/;

export const filterPassword = /.{6,}/;