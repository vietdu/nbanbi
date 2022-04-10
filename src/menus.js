(()=> {

const looksLikeChrome = !!(window.chrome && (chrome.loadTimes || chrome.csi));
// NOTE: Microsoft Edge includes window.chrome.app
// (also this browser detection logic could likely use some more nuance)

window.menus = {
	"&File": [
		{
			item: "&New",
			shortcut: "Ctrl+Alt+N", // Ctrl+N opens a new browser window
			action: ()=> { file_new(); },
			description: "Creates a new document.",
		},
		{
			item: "&Open",
			shortcut: "Ctrl+O",
			action: ()=> { file_open(); },
			description: "Opens an existing document.",
		},
		{
			item: "Save &As",
			shortcut: "Ctrl+Shift+S",
			// in mspaint, no shortcut is listed; it supports F12 (but in a browser that opens the dev tools)
			// it doesn't support Ctrl+Shift+S but that's a good & common modern shortcut
			action: ()=> { taixuong(); },
			description: "Saves the active document with a new name.",
		}
	],
	"&Edit": [
		{
			item: "&Undo",
			shortcut: "Ctrl+Z",
			enabled: () => undos.length >= 1,
			action: ()=> { undo(); },
			description: "Undoes the last action.",
		},
		{
			item: "&Repeat",
			shortcut: "F4",
			enabled: () => redos.length >= 1,
			action: ()=> { redo(); },
			description: "Redoes the previously undone action.",
		},
		{
			item: "&History",
			shortcut: "Ctrl+Shift+Y",
			action: ()=> { show_document_history(); },
			description: "Shows the document history and lets you navigate to states not accessible with Undo or Repeat.",
		},
		
		{
			item: "C&lear Selection",
			shortcut: "Del",
			enabled: () => !!selection,
			action: ()=> { delete_selection(); },
			description: "Deletes the selection.",
		},
		{
			item: "Select &All",
			shortcut: "Ctrl+A",
			action: ()=> { select_all(); },
			description: "Selects everything.",
		},
		
		{
			item: "Paste &From...",
			action: ()=> { paste_from_file_select_dialog(); },
			description: "Pastes a file into the selection.",
		}
	],
	"&View": [
		{
			item: "&Tool Box",
			// shortcut: "Ctrl+T", // opens a new browser tab
			checkbox: {
				toggle: ()=> {
					$toolbox.toggle();
				},
				check: () => $toolbox.is(":visible"),
			},
			description: "Shows or hides the tool box.",
		},
		{
			item: "&Color Box",
			// shortcut: "Ctrl+L", // focuses browser address bar
			checkbox: {
				toggle: ()=> {
					$colorbox.toggle();
				},
				check: () => $colorbox.is(":visible"),
			},
			description: "Shows or hides the color box.",
		},
		{
			item: "&Status Bar",
			checkbox: {
				toggle: ()=> {
					$status_area.toggle();
				},
				check: () => $status_area.is(":visible"),
			},
			description: "Shows or hides the status bar.",
		},
		{
			item: "T&ext Toolbar",
			enabled: false, // @TODO: toggle fonts box
			checkbox: {},
			description: "Shows or hides the text toolbar.",
		},
		MENU_DIVIDER,
		{
			item: "&Zoom",
			submenu: [
				{
					item: "&Normal Size",
					// shortcut: "Ctrl+PgUp", // cycles thru browser tabs
					description: "Zooms the picture to 100%.",
					enabled: () => magnification !== 1,
					action: ()=> {
						set_magnification(1);
					},
				},
				{
					item: "&Large Size",
					// shortcut: "Ctrl+PgDn", // cycles thru browser tabs
					description: "Zooms the picture to 400%.",
					enabled: () => magnification !== 4,
					action: ()=> {
						set_magnification(4);
					},
				},
				{
					item: "C&ustom...",
					description: "Zooms the picture.",
					action: ()=> { show_custom_zoom_window(); },
				},
				MENU_DIVIDER,
				{
					item: "Show &Grid",
					shortcut: "Ctrl+G",
					enabled: () => magnification >= 4,
					checkbox: {
						toggle: toggle_grid,
						check: () => show_grid,
					},
					description: "Shows or hides the grid.",
				},
				{
					item: "Show T&humbnail",
					enabled: false, // @TODO: implement Show Thumbnail
					checkbox: {},
					description: "Shows or hides the thumbnail view of the picture.",
				}
			]
		},
		{
			item: "&View Bitmap",
			shortcut: "Ctrl+F",
			action: ()=> { view_bitmap(); },
			description: "Displays the entire picture.",
		}
	],
	"&Image": [
		{
			item: "&Flip/Rotate",
			// shortcut: "Ctrl+R", // reloads browser tab
			action: ()=> { image_flip_and_rotate(); },
			description: "Flips or rotates the picture or a selection.",
		},
		{
			item: "&Stretch/Skew",
			// shortcut: "Ctrl+W", // closes browser tab
			action: ()=> { image_stretch_and_skew(); },
			description: "Stretches or skews the picture or a selection.",
		},
		{
			item: "&Invert Colors",
			shortcut: "Ctrl+I",
			action: ()=> { image_invert_colors(); },
			description: "Inverts the colors of the picture or a selection.",
		},
		{
			item: "&Attributes...",
			shortcut: "Ctrl+E",
			action: ()=> { image_attributes(); },
			description: "Changes the attributes of the picture.",
		},
		{
			item: "&Clear Image",
			shortcut: looksLikeChrome ? undefined : "Ctrl+Shift+N", // opens incognito window in chrome
			// (mspaint says "Ctrl+Shft+N")
			action: ()=> { !selection && clear(); },
			enabled: ()=> !selection,
			description: "Clears the picture.",
			// action: ()=> {
			// 	if (selection) {
			// 		delete_selection();
			// 	} else {
			// 		clear();
			// 	}
			// },
			// mspaint says "Clears the picture or selection.", but grays out the option when there's a selection
		},
		{
			item: "&Draw Opaque",
			checkbox: {
				toggle: ()=> {
					tool_transparent_mode = !tool_transparent_mode;
					$G.trigger("option-changed");
				},
				check: () => !tool_transparent_mode,
			},
			description: "Makes the current selection either opaque or transparent.",
		}
	],
	"&Colors": [
		{
			item: "&Edit Colors...",
			action: ()=> {
				$colorbox.edit_last_color();
			},
			description: "Creates a new color.",
		},
		{
			item: "&Get Colors",
			action: ()=> {
				get_FileList_from_file_select_dialog((files)=> {
					const file = files[0];
					Palette.load(file, (err, new_palette)=> {
						if(err){
							show_error_message("This file is not in a format that paint recognizes, or no colors were found.");
						}else{
							palette = new_palette;
							$colorbox.rebuild_palette();
						}
					});
				});
			},
			description: "Uses a previously saved palette of colors.",
		},
		{
			item: "&Save Colors",
			action: ()=> {
				const blob = new Blob([JSON.stringify(palette)], {type: "application/json"});
				sanity_check_blob(blob, ()=> {
					saveAs(blob, "colors.json");
				});
			},
			description: "Saves the current palette of colors to a file.",
		}
	],
	"E&xtras": [
		{
			item: "&History",
			shortcut: "Ctrl+Shift+Y",
			action: ()=> { show_document_history(); },
			description: "Shows the document history and lets you navigate to states not accessible with Undo or Repeat.",
		},
		
		{
			item: "&Themes",
			submenu: [
				{
					item: "&Classic",
					action: ()=> {
						set_theme("classic.css");
					},
					enabled: () => get_theme() != "classic.css",
					description: "Makes JS Paint look like MS Paint from Windows 98.",
				},
				{
					item: "&Modern",
					action: ()=> {
						set_theme("modern.css");
					},
					enabled: () => get_theme() != "modern.css",
					description: "Makes JS Paint look a bit more modern.",
				},
				{
					item: "&Winter",
					action: ()=> {
						set_theme("winter.css");
					},
					enabled: () => get_theme() != "winter.css",
					description: "Makes JS Paint look festive for the holidays.",
				},
			]
		},
		MENU_DIVIDER,
		{
			item: "Manage Storage",
			action: ()=> { manage_storage(); },
			description: "Manages storage of previously created or opened pictures.",
		}
	],
};

})();
