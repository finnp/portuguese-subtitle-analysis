.PHONY: all run subtitles

run:
	deno run --allow-read --allow-net index.ts

subtitles:
	deno run --allow-read --allow-net --allow-write parse-subtitles.ts