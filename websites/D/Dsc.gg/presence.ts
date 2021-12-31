const presence = new Presence({
    clientId: "843711390539841577"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp = await presence.getSetting<boolean>("timestamp"),
    showButtons = await presence.getSetting<boolean>("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "dscgg",
      details: "Viewing 📰 page:",
      state: "🛑 Unsupported"
    };

  if (document.location.hostname === "dsc.gg") {
    if (document.location.pathname === "/") presenceData.state = "🏡 Home";
    else if (document.location.pathname.includes("/search")) {
      presenceData.details = "🔎 Searching for:";
      presenceData.state = `🔗 ${
        document.getElementById("searchBar")?.getAttribute("value") || "Nothing"
      }`;
      presenceData.smallImageKey = "search";
      presenceData.buttons = [
        {
          label: "View Results",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/about") {
      presenceData.state = "📚 About";
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.state = "💎 Premium";
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/developers/about") {
      presenceData.state = "💻 Developer";
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname === "/developers/dashboard") {
      presenceData.details = "Viewing ⚙️ dashboard";
      presenceData.state = "🖥️ Developer";
    } else if (document.location.pathname === "/dashboard") {
      presenceData.details = "Viewing ⚙️ dashboard";
      presenceData.state = "🔗 Links";
    } else if (document.location.pathname.includes("/dashboard/l/")) {
      const [, link] = document.location.pathname.split("/dashboard/l/");
      presenceData.details = `Editing 🔗 ${link} link`;
      presenceData.state = `🏓 Tab: ${
        location.href.includes("#tab")
          ? location.href.replace(
              `https://dsc.gg/dashboard/l/${link}#tab=`,
              " "
            )
          : "basic"
      }`;
      presenceData.buttons = [
        {
          label: "Visit Link",
          url: `https://dsc.gg/${link}`
        }
      ];
    } else if (document.location.pathname === "/legal/privacy")
      presenceData.state = "📜 Privacy Policy";
    else if (document.location.pathname === "/legal/tos")
      presenceData.state = "📖 Terms of Service";
  } else if (document.location.hostname === "docs.dsc.gg") {
    if (document.location.pathname === "/") {
      presenceData.details = "Viewing 📑 Documentation";
      presenceData.state = `🌐 Content: ${
        location.href.includes("#")
          ? location.href.replace("https://docs.dsc.gg/#", " ")
          : "📧 Introduction"
      }`;
    } else if (document.location.pathname === "/endpoints") {
      presenceData.details = "Viewing 🔗 endpoints";
      presenceData.state = `🌐 Content: ${
        location.href.includes("#")
          ? location.href.replace("https://docs.dsc.gg/endpoints#", " ")
          : "None"
      }`;
    } else if (document.location.pathname === "/widgets") {
      presenceData.details = "Viewing 🖼️ widgets";
      presenceData.state = `🌐 Content: ${
        location.href.includes("#")
          ? location.href.replace("https://docs.dsc.gg/widgets#", " ")
          : "None"
      }`;
    }
  }

  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});