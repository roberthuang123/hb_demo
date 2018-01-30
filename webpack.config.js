var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './dist_h5/main.js',
    output: {
        filename: '[name].build.js?[chunkhash]'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.resolve('dist_h5')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerModules: [{
                        staticKeys: 'staticStyle',
                        genData (el) {
                            let data = ''
                            if (el.staticStyle) {
                                data += `staticStyle:$rpxFilter(${el.staticStyle}),`
                            }
                            if (el.styleBinding) {
                                data += `style:($rpxFilter(${el.styleBinding})),`
                            }
                            return data
                        }
                    }]
                }
            },
            {
		        test: /\.vue$/,
		        loader: 'base64ify-loader',
		        options: {
		            ext: 'png|jpg|jpeg|gif'
		        }
	      	},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
	 	new webpack.optimize.CommonsChunkPlugin({
	      name: 'vendor',
	      minChunks: function (module, count) {
	        return (
	          module.resource &&
	          /\.js$/.test(module.resource) &&
	          (module.resource.indexOf(
	            path.join(__dirname, './node_modules')
	          ) === 0 || module.resource.indexOf(
	            path.join(__dirname, '../node_modules')
	          ) === 0)
	        )
	      }
	    }),
	 	new webpack.optimize.CommonsChunkPlugin({
	      name: 'manifest',
	      chunks: ['vendor']
	    }),
    	new HtmlWebpackPlugin({
    		title: 'app',
    		template: './index.html',
    		inject: true,
	      	minify: {
	        	removeComments: true,
	        	collapseWhitespace: true,
        		removeAttributeQuotes: true
	      	}
    	}),
    	new webpack.optimize.UglifyJsPlugin({
			test: /main\.build\.js($|\?)/i,
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
	    })
    ]
}
