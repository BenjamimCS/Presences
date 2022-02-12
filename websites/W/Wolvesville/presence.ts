const presence = new Presence({
		clientId: "888429594120716328"
	}),
	startedTime = Math.floor(Date.now() / 1000);

function languageCode(language: string): string {
	switch (language) {
		case "ar":
			return "Arabic";
		case "af":
			return "Afrikaans";
		case "sq":
			return "Albanian";
		case "am":
			return "Amharic";
		case "hy":
			return "Armenian";
		case "az":
			return "Azerbaijani";
		case "eu":
			return "Basque";
		case "be":
			return "Belarussian";
		case "bn":
			return "Bengali";
		case "bs":
			return "Bosnian";
		case "bg":
			return "Bulgarian";
		case "ca":
			return "Catalan";
		case "ceb":
			return "Cebuano";
		case "ny":
			return "Chichewa";
		case "zh":
			return "Chinese";
		case "co":
			return "Corsican";
		case "hr":
			return "Croatin";
		case "cs":
			return "Czech";
		case "da":
			return "Danish";
		case "nl":
			return "Dutch";
		case "en":
			return "English";
		case "eo":
			return "Esperanto";
		case "et":
			return "Estonian";
		case "tl":
			return "Filipino";
		case "fi":
			return "Finnish";
		case "fr":
			return "French";
		case "fy":
			return "Frisian";
		case "gl":
			return "Galician";
		case "ka":
			return "Georgian";
		case "de":
			return "German";
		case "el":
			return "Greek";
		case "gu":
			return "Gujarati";
		case "ht":
			return "Haitian Creole";
		case "ha":
			return "Hausa";
		case "haw":
			return "Hawaiian";
		case "iw":
			return "Hebrew";
		case "hi":
			return "Hindi";
		case "hmn":
			return "Hmong";
		case "hu":
			return "Hungarian";
		case "is":
			return "Icelandic";
		case "ig":
			return "Igbo";
		case "id":
			return "Indonesian";
		case "ga":
			return "Irish";
		case "it":
			return "Italian";
		case "jp":
			return "Japanese";
		case "jw":
			return "Javanese";
		case "kn":
			return "Kannada";
		case "kk":
			return "Kazakh";
		case "km":
			return "Khmer";
		case "rw":
			return "Kinyarwanda";
		case "ko":
			return "Korean";
		case "ku":
			return "Kurdish (Kurmanji)";
		case "ky":
			return "Kyrgyz";
		case "lo":
			return "Lao";
		case "la":
			return "Latin";
		case "lv":
			return "Latvian";
		case "lt":
			return "Lithuanian";
		case "lb":
			return "Luxembourgish";
		case "mk":
			return "Macedonian";
		case "mg":
			return "Malagasy";
		case "ms":
			return "Malay";
		case "ml":
			return "Malayalam";
		case "mt":
			return "Maltese";
		case "mi":
			return "Maori";
		case "mr":
			return "Marathi";
		case "mn":
			return "Mongolian";
		case "my":
			return "Myanmar (Burmese)";
		case "ne":
			return "Nepali";
		case "no":
			return "Norwegian";
		case "or":
			return "Odia (Oriya)";
		case "ps":
			return "Pashto";
		case "fa":
			return "Persian";
		case "pl":
			return "Polish";
		case "pt":
			return "Portuguese";
		case "pa":
			return "Punjabi";
		case "ro":
			return "Romanian";
		case "ru":
			return "Russian";
		case "sm":
			return "Samoan";
		case "gd":
			return "Scots Gaelic";
		case "sr":
			return "Serbian";
		case "st":
			return "Sesotho";
		case "sn":
			return "Shona";
		case "sd":
			return "Sindhi";
		case "si":
			return "Sinhala";
		case "sk":
			return "Slovak";
		case "sl":
			return "Slovenian";
		case "so":
			return "Somali";
		case "es":
			return "Spanish";
		case "su":
			return "Sundanese";
		case "sw":
			return "Swahili";
		case "sv":
			return "Swedish";
		case "tg":
			return "Tajik";
		case "ta":
			return "Tamil";
		case "tt":
			return "Tatar";
		case "te":
			return "Telugu";
		case "th":
			return "Thai";
		case "tr":
			return "Turkish";
		case "tk":
			return "Turkmen";
		case "uk":
			return "Ukrainian";
		case "ur":
			return "Urdu";
		case "ug":
			return "Uyghur";
		case "uz":
			return "Uzbek";
		case "vi":
			return "Vietnamese";
		case "cy":
			return "Welsh";
		case "xh":
			return "Xhosa";
		case "yi":
			return "Yiddish";
		case "yo":
			return "Yoruba";
		case "zu":
			return "Zulu";
		default:
			return "unknown";
	}
}

presence.on("UpdateData", async () => {
	const [privacyMode, privacyChat, gameLang, showTimestamp, logo] =
			await Promise.all([
				presence.getSetting<boolean>("privacy"),
				presence.getSetting<boolean>("privacyChat"),
				presence.getSetting<boolean>("gameLang"),
				presence.getSetting<boolean>("showTimestamp"),
				presence.getSetting<number>("logo")
			]),
		// eslint-disable-next-line no-one-time-vars/no-one-time-vars
		logoArr = ["wov", "wov_no_bg", "wov_text"],
		presenceData: PresenceData = {
			largeImageKey: logoArr[logo] || "wov"
		};

	if (showTimestamp) presenceData.startTimestamp = startedTime;

	//Wolvesville Blog
	if (document.location.href.includes("blog.wolvesville.com")) {
		presenceData.smallImageKey = "wov_blog";
		presenceData.smallImageText = "Development Blog";
		if (
			document.location.pathname === "/" ||
			document.location.pathname.startsWith("/page")
		) {
			presenceData.details = "Development Blog";
			presenceData.state = "Browsing posts";
		} else if (document.querySelector(".post-title")) {
			if (!privacyMode) {
				presenceData.details = "Reading a blog post:";
				presenceData.state = document.querySelector(".post-title")?.textContent;
				presenceData.buttons = [
					{
						label: "Read Post",
						url: document.URL
					}
				];
			} else presenceData.state = "Reading a blog post";
		}

		//Legal
	} else if (document.location.href.includes("legal.wolvesville.com")) {
		presenceData.details = "Legal";
		if (document.location.pathname.includes("tos"))
			presenceData.state = "Reading the Terms of Service";
		else if (document.location.pathname.includes("privacy-policy"))
			presenceData.state = "Reading the Privacy Policy";
		else if (document.location.pathname.includes("imprint"))
			presenceData.state = "Reading the imprint";

		//Wolvesvile Heroes
	} else if (document.location.href.includes("heroes.wolvesville.com")) {
		presenceData.details = "Wolvesville Heroes";
		presenceData.state = "Home page";
		presenceData.smallImageKey = "wov_heroes";
		presenceData.smallImageText = "Wolvesville Heroes";

		if (document.location.pathname.includes("overview"))
			presenceData.state = "Overview";
		else if (document.location.pathname.includes("applications"))
			presenceData.state = "Applications";
		else if (document.location.pathname.includes("updates"))
			presenceData.state = "Updates";
		else if (
			document.location.href.includes("list?role") ||
			document.location.href.includes("list.html?role")
		) {
			if (!privacyMode) {
				presenceData.state = `Viewing the ${
					document.querySelector("#staff_member_name")?.textContent
				} role`;
			} else presenceData.state = "Viewing a role";
		} else if (
			document.location.href.includes("list?member") ||
			document.location.href.includes("list.html?member")
		) {
			if (!privacyMode) {
				presenceData.state = `Viewing ${
					document.querySelector("#staff_member_name")?.textContent
				}`;
			} else presenceData.state = "Viewing a member";
		}

		//Voting Gallery
	} else if (document.location.href.includes("voting.wolvesville.com")) {
		presenceData.details = "Voting Gallery";

		const submissionView = document.querySelector(".css-757v71");

		if (submissionView) {
			if (!privacyMode)
				presenceData.state = `Viewing submission by ${submissionView.textContent}`;
			else presenceData.state = "Viewing a submission";
		} else presenceData.state = "Browsing...";

		//App info page
	} else if (document.location.href.includes("app.wolvesville.com"))
		presenceData.details = "App page";
	//Vouchers
	else if (document.location.href.includes("vouchers.wolvesville.com")) {
		presenceData.details = "Redeeming a code";
		presenceData.smallImageKey = "vouchers";
		presenceData.smallImageText = "Redeem";

		//Game
	} else if (document.location.href.includes("wolvesville.com")) {
		const root = document.querySelector("#root");

		//Loading Screen
		document.querySelector(
			"div.css-1dbjc4n.r-1p0dtai.r-18u37iz.r-1777fci.r-1d2f490.r-98ikmy.r-u8s1d.r-zchlnj > div.css-1dbjc4n.r-1ffj0ar.r-z2wwpe.r-18u37iz.r-1w6e6rj.r-1777fci.r-1l7z4oj.r-gu0qjt.r-85oauj.r-95jzfe > div.css-1dbjc4n.r-1awozwy.r-1777fci > div.css-1dbjc4n.r-17bb2tj.r-1muvv40.r-127358a.r-1ldzwu0.r-z80fyv.r-19wmn03"
		)
			? (presenceData.details = "Loading Wolvesville...")
			: false;

		//Login
		document.querySelector(
			"div.css-1dbjc4n.r-z2wwpe.r-13awgt0.r-1dhrvg0.r-169s5xo.r-hvns9x.r-1pcd2l5"
		)
			? (presenceData.details = "At the login page")
			: false;

		//Menu
		if (
			document.querySelector(
				"div.css-1dbjc4n.r-1awozwy.r-1p0dtai.r-18u37iz.r-u8s1d.r-e1k2in.r-ipm5af"
			)
		) {
			presenceData.details = "At the main menu";

			//Save username
			if (
				document.querySelectorAll(
					"div.css-901oao.r-jwli3a.r-ubezar.r-5oul0u"
				)[0]?.textContent
			) {
				root.setAttribute(
					"premid-username",
					document.querySelectorAll(
						"div.css-901oao.r-jwli3a.r-ubezar.r-5oul0u"
					)[0]?.textContent
				);
			}

			if (!privacyMode) {
				//Username
				presenceData.state = root.getAttribute("premid-username");

				//Inventory
				document.querySelector(
					"div.css-1dbjc4n.r-kdyh1x.r-eqz5dr.r-1pi2tsx.r-a2tzq0.r-1ybube5"
				)
					? (presenceData.state = "Inventory")
					: false;

				//Shop
				document.querySelector(
					"div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1w6e6rj.r-1777fci.r-1guathk"
				)
					? (presenceData.state = "Shop")
					: false;

				//Clan
				if (
					document.querySelector(
						"div.css-1dbjc4n.r-13awgt0.r-zd98yo.r-1v1z2uz.r-13qz1uu"
					)
				) {
					//check if viewing their clan or another one
					if (
						document.querySelector(
							"div.css-1dbjc4n.r-1xfd6ze.r-13awgt0.r-1pi2tsx.r-1udh08x"
						)
					) {
						//viewing a clan
						if (
							document.querySelector(
								"div.css-901oao.css-vcwn7f.r-qctebb.r-1i10wst.r-1kfrs79"
							)
						) {
							presenceData.state = `Viewing clan: ${
								document.querySelector(
									"div.css-901oao.css-vcwn7f.r-qctebb.r-1i10wst.r-1kfrs79"
								).textContent
							}`;
							//searching for a clan
						} else if (
							document
								.querySelector(
									"div.css-1dbjc4n.r-cdmcib.r-13awgt0.r-88pszg.r-1uu6nss > input"
								)
								.getAttribute("value")
						) {
							presenceData.state = `Searching clans for: '${document
								.querySelector(
									"div.css-1dbjc4n.r-cdmcib.r-13awgt0.r-88pszg.r-1uu6nss > input"
								)
								.getAttribute("value")}'`;
						} else presenceData.state = "Browsing clans";
					} else {
						presenceData.state = `Viewing their clan: ${
							document.querySelector(
								"div.css-901oao.css-vcwn7f.r-qctebb.r-1i10wst.r-1kfrs79"
							)?.textContent
						}`;
					}
				}

				//Wheel
				document.querySelector(
					"div.css-1dbjc4n.r-1kihuf0.r-1mlwlqe.r-1d2f490.r-1udh08x.r-zchlnj > div.css-1dbjc4n.r-1niwhzg.r-vvn4in.r-u6sd8q.r-ehq7j7.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-1wyyakw"
				)
					? (presenceData.state = "Spinning the wheel")
					: false;

				//Settings
				document.querySelector(
					"div.css-1dbjc4n.r-150rngu.r-1niwhzg.r-13awgt0.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1lxl8vk.r-11yh6sk.r-1rnoaur.r-1sncvnh.r-13qz1uu"
				)
					? (presenceData.state = "Settings")
					: false;

				//Mentor chat
				document.querySelector("iframe[title='Mentor Chat']")
					? (presenceData.state = "Mentor chat")
					: false;

				//Chat
				if (
					document.querySelector(
						"div.css-1dbjc4n.r-1p0dtai.r-qdtdgp.r-u8s1d.r-1ro7rbe.r-ipm5af > div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-u8s1d.r-ipm5af > div.css-1dbjc4n.r-1pi2tsx.r-13qz1uu > div.css-1dbjc4n.r-led734.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af"
					)
				) {
					if (!privacyChat) {
						presenceData.state = `Chatting with ${
							document.querySelector(
								"div.css-1dbjc4n.r-19u6a5r > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-f1odvy > div.css-901oao.r-jwli3a.r-1x35g6.r-vw2c0b"
							)?.textContent
						}`;
					} else presenceData.state = "Chatting with a friend";
				}

				//Clan chat
				document.querySelector(
					"div.css-1dbjc4n.r-1p0dtai.r-qdtdgp.r-u8s1d.r-1ro7rbe.r-ipm5af > div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-u8s1d.r-ipm5af > div.css-1dbjc4n.r-13awgt0 > div.css-1dbjc4n.r-13awgt0.r-wk8lta > div.css-1dbjc4n.r-led734.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af"
				)
					? (presenceData.state = "Clan chat")
					: false;
			}
		}

		//Custom Games
		if (
			document.querySelector(
				"div.css-1dbjc4n.r-18u37iz.r-1777fci.r-p1pxzi.r-1u936jj.r-1a6n0ax"
			)
		) {
			presenceData.details = "Browsing custom games";
			if (!privacyMode)
				presenceData.state = root.getAttribute("premid-username");
		}

		//Lobby
		if (
			document.querySelector(
				"div.css-1dbjc4n.r-13awgt0.r-gy4na3.r-wk8lta > div.css-1dbjc4n.r-1awozwy.r-led734.r-vu3uv8.r-18u37iz.r-ur6pnr.r-13qz1uu.r-136ojw6"
			) ??
			document.querySelector(
				"div.css-1dbjc4n.r-13awgt0.r-wk8lta > div.css-1dbjc4n.r-1awozwy.r-led734.r-vu3uv8.r-18u37iz.r-ur6pnr.r-13qz1uu.r-136ojw6"
			)
		) {
			document.querySelector("div.css-1dbjc4n.r-1awozwy.r-173mn98.r-18u37iz")
				? (presenceData.details = "In a friends lobby")
				: (presenceData.details = "In a custom game lobby");

			if (!privacyMode) {
				if (
					!document.querySelector(
						"div.css-1dbjc4n.r-1awozwy.r-1p0dtai.r-1777fci.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-1pozq62 > div.css-1dbjc4n.r-1awozwy.r-1777fci > div.css-1dbjc4n.r-17bb2tj.r-1muvv40.r-127358a.r-1ldzwu0.r-1r8g8re.r-1acpoxo"
					)
				) {
					const playerCountLobby = document.querySelectorAll(
						"div.css-1dbjc4n.r-1awozwy.r-1777fci.r-1rngwi6"
					)?.length;

					if (playerCountLobby === 1)
						presenceData.state = `${playerCountLobby} player connected`;
					else presenceData.state = `${playerCountLobby} players connected`;
				} else presenceData.state = "Loading...";
				presenceData.smallImageText = `${root.getAttribute("premid-username")}`;
			}
			presenceData.smallImageKey = "friends";
		}

		//In game
		if (
			document.querySelector(
				"div.css-1dbjc4n.r-1xfd6ze.r-d045u9.r-13awgt0.r-edyy15"
			)
		) {
			if (
				!document.querySelector(
					"div.css-1dbjc4n.r-1awozwy.r-1777fci > div.css-1dbjc4n.r-17bb2tj.r-1muvv40.r-127358a.r-1ldzwu0.r-1r8g8re.r-1acpoxo"
				)
			) {
				//Pre-game Lobby
				let preGameLobby = !!document.querySelector(
						"div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-1loqt21.r-sga3zk.r-1sbahrg.r-1otgn73.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao"
					),
					lobbyChar: string;

				if (!preGameLobby) {
					preGameLobby = !!document.querySelector(
						"div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-sga3zk.r-12c3ph5.r-1sbahrg.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao.r-1281ybr"
					);

					if (preGameLobby) {
						lobbyChar = document.querySelector(
							"div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-sga3zk.r-12c3ph5.r-1sbahrg.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao.r-1281ybr"
						)?.textContent;
					}
				} else {
					lobbyChar = document.querySelector(
						"div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-1loqt21.r-sga3zk.r-1sbahrg.r-1otgn73.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao"
					)?.textContent;
				}

				if (preGameLobby && lobbyChar === "") {
					presenceData.details = "In pre-game lobby";
					presenceData.smallImageKey = "stopwatch";
					presenceData.smallImageText = "Waiting for the game to begin";
					if (!privacyMode) {
						let playerCountPreGame = document.querySelectorAll(
							"div.css-1dbjc4n.r-kdyh1x.r-1loqt21.r-13awgt0.r-1064s9p.r-1udh08x.r-1otgn73.r-lrvibr[tabindex='0']"
						)?.length;
						playerCountPreGame = 16 - playerCountPreGame;

						if (playerCountPreGame === 1)
							presenceData.state = `${playerCountPreGame} player connected`;
						else presenceData.state = `${playerCountPreGame} players connected`;

						presenceData.smallImageText = `${root.getAttribute(
							"premid-username"
						)} - Waiting for the game to begin`;
					}
				} else {
					//Playing
					let gamemode: string,
						playerState: string,
						gameState = "",
						gameOver = false,
						rankedLeague = "unknown",
						lang = "unknown";

					if (!privacyMode) {
						const gamemodeId = localStorage?.getItem("last-game-game-mode");
						if (gamemodeId?.includes("sandbox")) gamemode = "Sandbox";
						else if (gamemodeId?.includes("custom")) gamemode = "a Custom Game";
						else if (gamemodeId?.includes("advanced")) {
							gamemode = "an Advanced Game";
							lang = languageCode(gamemodeId?.split("-")[1]);
						} else if (gamemodeId?.includes("crazy")) gamemode = "a Crazy Game";
						else if (gamemodeId?.includes("ranked")) {
							gamemode = "a Ranked Game";
							if (gamemodeId?.endsWith("2")) rankedLeague = "Standard League";
							else if (gamemodeId?.endsWith("3"))
								rankedLeague = "Advanced League";
						} else {
							lang = languageCode(gamemodeId);
							if (lang === "unknown") gamemode = "a game";
							else gamemode = "a Quick Game";
						}
					}

					//Spectator
					if (
						document.querySelector(
							"div.css-1dbjc4n.r-1niwhzg.r-vvn4in.r-u6sd8q.r-ehq7j7.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-1wyyakw[style*='/static/media/spectator_popcorn']"
						)
					) {
						playerState = "Spectator";
						presenceData.smallImageKey = "popcorn";
						if (!privacyMode) {
							let gameDetails = `Spectating ${gamemode}`;
							if (lang !== "unknown" && gameLang)
								gameDetails = gameDetails.concat(` in ${lang}`);
							else if (rankedLeague !== "unknown")
								gameDetails = gameDetails.concat(` in ${rankedLeague}`);

							presenceData.details = gameDetails;
							presenceData.smallImageText = `${playerState} (${root.getAttribute(
								"premid-username"
							)})`;
						} else {
							presenceData.details = "Spectating a game";
							presenceData.smallImageText = playerState;
						}
					} else {
						if (!privacyMode) {
							let details = `Playing ${gamemode}`;
							if (lang !== "unknown" && gameLang)
								details = details.concat(` in ${lang}`);
							else if (rankedLeague !== "unknown")
								details = details.concat(` in ${rankedLeague}`);

							presenceData.details = details;
						} else presenceData.details = "Playing a game";

						if (!privacyMode) {
							if (
								document.querySelector(
									"div.css-1dbjc4n.r-1mlwlqe.r-1udh08x.r-u8s1d.r-417010 > div.css-1dbjc4n.r-1niwhzg.r-vvn4in.r-u6sd8q.r-ehq7j7.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-1wyyakw[style*='/static/media/game_over_tied']"
								)
							) {
								playerState = "Dead";
								presenceData.smallImageKey = "skull";
							} else {
								playerState = "Alive";
								presenceData.smallImageKey = "heart";
							}

							presenceData.smallImageText = `${playerState} (${root.getAttribute(
								"premid-username"
							)})`;
						}
					}

					//Game Over
					document.querySelector(
						"div.css-1dbjc4n.r-1p0dtai.r-1loqt21.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-1otgn73.r-lrvibr.r-1pwx3x0 > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-1dbjc4n.r-6dt33c.r-13qz1uu"
					)
						? ((presenceData.details = "Game over"),
						  delete presenceData.smallImageKey,
						  (gameOver = true))
						: false;

					//Player count
					if (!privacyMode) {
						const playerCount = document.querySelectorAll(
								"div.css-1dbjc4n.r-obd0qt.r-1p6tffz.r-17s6mgv.r-l4djrs.r-5kp9u6.r-12vffkv.r-u8s1d.r-1xce0ei.r-1s3egr7"
							)?.length,
							aliveCount =
								playerCount -
								(
									document
										.querySelector(
											"div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-5oul0u.r-11yh6sk.r-1rnoaur.r-1sncvnh.r-13qz1uu"
										)
										?.innerHTML.match(/text-decoration-line: line-through/g) ||
									[]
								).length /
									2;

						if (gameOver === false && playerState !== "Spectator")
							gameState = `${playerState} - `;

						if (aliveCount === 1) {
							gameState = gameState.concat(
								`${aliveCount}/${playerCount} player left`
							);
						} else {
							gameState = gameState.concat(
								`${aliveCount}/${playerCount} players left`
							);
						}
					}
					presenceData.state = gameState;
				}
			} else {
				presenceData.details = "In pre-game lobby";
				if (!privacyMode) presenceData.state = "Loading...";
			}
		}
	}
	presence.setActivity(presenceData);
});