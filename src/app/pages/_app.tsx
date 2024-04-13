import React from 'react';
import App from 'next/app';
import Layout from '../components/Header';

export default class FamditApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Layout links={[{href: "/parent", label:"Parent"}, {href: "/john", label:" Child - John"}]}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}