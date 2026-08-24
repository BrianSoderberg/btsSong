All three, done:

1. Songs in a subfolder — auto-discovery now checks both the repo root and a songs/ folder next to index.html. Drop your .onsong files in either place and they'll show up in "All Songs" for anyone who visits, no manifest needed.

2. Export / Import buttons — in the sidebar footer:

⇩ Export setlists downloads a setlists.json with your setlists written as song filenames (portable across devices/repos), plus a raw copy for perfect round-tripping on the same browser.
⇧ Import setlists reads one back in and adds it to your list (renames on conflict rather than overwriting).

3. Shared setlists for visitors — drop a setlists.json in the same folder as your songs (root or songs/), formatted like what Export produces:

json
{"setlists":[{"name":"Sunday Set","songs":["Amazing Grace.onsong","Blessed Be.onsong"]}]}

or the simpler array form:

json
[{"name":"Sunday Set","songs":["Amazing Grace.onsong","Blessed Be.onsong"]}]

On page load, this gets auto-fetched and merged in as setlists marked "(shared)" — visible to everyone who opens your page, no setup needed on their end. They're pre-populated but not locked: if a visitor reorders or edits one, it just saves that as their own local copy from then on, so your published version won't get clobbered.

One limitation worth flagging: song matching for shared setlists is by filename (case-insensitive), so keep filenames stable once you've published a setlists.json — renaming a .onsong file will break the reference until you re-export.


Two things that won't work on iPhone/iPad, both because it's WebKit (Safari's engine), not a bug in the code:

📁 Open folder — this uses a browser API (File System Access) that Apple hasn't implemented in WebKit at all, on any iOS browser, including Chrome for iOS (which is just Safari's engine underneath). The button already auto-hides on devices that don't support it, so you won't see a broken button — just use Open or Add files instead, which cover the same need file-by-file.
Drag-to-reorder in the setlist — native HTML drag-and-drop is unreliable-to-nonexistent on iOS touchscreens. The ▲ / ▼ buttons next to each song are the fallback for this and work fine with a tap — that's what you'd want to use on iPhone/iPad anyway.

One more thing worth knowing: everything's stored in Safari's local storage, and iOS has been known to clear that after ~7 days of not visiting the page (part of Apple's anti-tracking policy). If you're not opening it regularly, it's worth adding it to your Home Screen (Share → Add to Home Screen) — that tends to protect the storage, and it also makes it launch like a real app. Exporting your setlists occasionally as a backup isn't a bad habit either, just in case.