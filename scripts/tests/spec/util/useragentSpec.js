describe( 'the UserAgent utility library', function () {

	describe( 'the iOs user agent functionality', function () {

		it( 'detects an iphone', function () {

			var result;
			var ua = 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1C25 Safari/419.3';

			result = util.useragent.isIphone( ua );

			expect( result ).toBeTruthy();

		} );

		it( 'detects an ipod', function () {

			var result;
			var ua = 'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3';

			result = util.useragent.isIphone( ua );

			expect( result ).toBeTruthy();

		} );

		it( 'detects an ipad', function () {

			var result;
			var result2;
			var ua = 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) version/4.0.4 Mobile/7B367 Safari/531.21.10';
			var ua2 = 'Mozilla/5.0 (iProd; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko)';

			result = util.useragent.isIpad( ua );
			result2 = util.useragent.isIpad( ua2 );

			expect( result ).toBeTruthy();
			expect( result2 ).toBeTruthy();

		} );

	} );

	describe( 'the android user agent functionality', function () {

		describe( 'detecting android user agents', function () {

			it( 'should match an android user agent', function () {

				var result;
				var ua = 'Opera/9.80 (Android 3.0.1; Linux; Opera Tablet/ADR-1105231029; U; ja) Presto/2.7.81 Version/11.00';

				result = util.useragent.isAndroid( ua );

				expect( result ).toBeTruthy();

			} );

		} );

		describe( 'detecting old android user agents', function () {

			describe( 'testung against new android user agents', function () {

				it( 'should not match an android 3.0 user agent', function () {

					var result;
					var ua = 'Opera/9.80 (Android 3.0.1; Linux; Opera Tablet/ADR-1105231029; U; ja) Presto/2.7.81 Version/11.00';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeFalsy();

				} );

				it( 'should not match an android 3.1 user agent', function () {

					var result;
					var ua = 'Opera/9.80 (Android 3.1; Linux; Opera Tablet/ADR-1107051709; U; en) Presto/2.8.149 Version/11.10';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeFalsy();

				} );

				it( 'should not match an android 3.2 user agent', function () {

					var result;
					var ua = 'Opera/9.80 (Android 3.2.1; Linux; Opera Tablet/ADR-1205181138; U; en) Presto/2.10.254 Version/12.00';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeFalsy();

				} );

				it( 'should not match an android 4.0 user agent', function () {

					var result;
					var ua = 'Opera/9.80 (Android 4.0.4; Linux; Opera Tablet/ADR-1207201819; U; en) Presto/2.10.254 Version/12.00 ';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeFalsy();

				} );

				it( 'should not match an android 4.1 user agent', function () {

					var result;
					var ua = 'Mozilla/5.0 (Linux; U; Android 4.1.2; en-us; Barnes & Noble Nook Tablet Build/JZO54K; CyanogenMod-10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeFalsy();

				} );

				it( 'should not match an android 4.2 user agent', function () {

					var result;
					var ua = 'Opera/9.80 (Android 4.2.1; Linux; Opera Tablet/ADR-1301080958) Presto/2.11.355 Version/12.10';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeFalsy();

				} );

			} );

			describe( 'detecting old android 2.0 user agents', function () {

				it( 'should detect an old samsung 2.0 user agent', function () {

					var result;
					var ua = 'Mozilla/5.0 (Linux; U; Android 2.0.1; en-us; Droid Build/ESD56) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeTruthy();

				} );

				it( 'should detect an old motorola 2.0 user agent', function () {

					var result;
					var ua = 'Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/ 530.17';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeTruthy();

				} );

			} );

			describe( 'detecting old android 2.1 user agents', function () {

				it( 'should detect an old 2.1 google nexus user agent', function () {

					var result;
					var ua = 'Mozilla/5.0 (Linux; U; Android 2.1; en-us; Nexus One Build/ERD62) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeTruthy();

				} );

				it( 'should detect an old htc 2.1 user agent', function () {

					var htcResult;
					var htcResult2;

					var htc = 'Mozilla/5.0 (Linux; U; Android 2.1-update1; de-de; HTC Desire 1.19.161.5 Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17';
					var htc2 = 'Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; ADR6300 Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17';

					htcResult = util.useragent.isOldAndroid( htc );
					htcResult2 = util.useragent.isOldAndroid( htc2 );

					expect( htcResult ).toBeTruthy();
					expect( htcResult2 ).toBeTruthy();

				} );

				it( 'should detect an old motorola 2.1 user agent', function () {

					var motorolaResult;
					var motorolaResult2;

					var motorola = 'Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; DROIDX Build/VZW) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17 480X854 motorola DROIDX';
					var motorola2 = 'Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; Droid Build/ESE81) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17';

					motorolaResult = util.useragent.isOldAndroid( motorola );
					motorolaResult2 = util.useragent.isOldAndroid( motorola2 );

					expect( motorolaResult ).toBeTruthy();
					expect( motorolaResult2 ).toBeTruthy();

				} );

				it( 'should detect an old sony 2.1 user agent', function () {

					var result;
					var ua = 'Mozilla/5.0 (Linux; U; Android 2.1-update1; de-de; E10i Build/2.0.2.A.0.24) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17';

					result = util.useragent.isOldAndroid( ua );

					expect( result ).toBeTruthy();

				} );

				describe( 'detecting old android 2.2 user agents', function () {

					it( 'should detect an old nexus 2.2 user agent', function () {

						var result;
						var ua = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';

						result = util.useragent.isOldAndroid( ua );

						expect( result ).toBeTruthy();

					} );

					it( 'should detect an old htc 2.2 user agent', function () {

						var result;
						var ua = '/Mozilla/5.0 (Linux; U; Android 2.2; nl-nl; Desire_A8181 Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';

						result = util.useragent.isOldAndroid( ua );

						expect( result ).toBeTruthy();

					} );

					it( 'should detect an old motorola 2.2 user agent', function () {

						var result;
						var ua = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; DROID2 GLOBAL Build/S273) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';

						result = util.useragent.isOldAndroid( ua );

						expect( result ).toBeTruthy();

					} );

					it( 'should detect an old samsung 2.2 user agent', function () {

						var result;
						var ua = 'Mozilla/5.0 (Linux; U; Android 2.2; en-gb; GT-P1000 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';

						result = util.useragent.isOldAndroid( ua );

						expect( result ).toBeTruthy();

					} );

				} );

				describe( 'detecting old android 2.3 user agents', function () {

					it( 'should detect an old htc 2.3 user agent', function () {

						var result;
						var ua = 'Mozilla/5.0 (Linux; U; Android 2.3.3; zh-tw; HTC_Pyramid Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1';

						result = util.useragent.isOldAndroid( ua );

						expect( result ).toBeTruthy();

					} );

				} );

			} );

		} );



	} );

} );