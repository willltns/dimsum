/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const loaderUtils = require('loader-utils')
const path = require('path')

module.exports = function getLessModuleLocalIdent(context, localIdentName, localName, options) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.less$/) ? '[folder]' : '[name]'
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5',
    'base64',
    5
  )
  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(context, fileNameOrFolder + '_' + localName + '__' + hash, options)

  if (process.env.NODE_ENV === 'production') {
    const compressed =
      className.charAt(1) + className.charAt(className.indexOf('_') + 1) + className.slice(className.indexOf('__') + 1)
    // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
    return compressed.replace('.module_', '_').replace(/\./g, '_')
  }
  // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
  return className.replace('.module_', '_').replace(/\./g, '_')
}
