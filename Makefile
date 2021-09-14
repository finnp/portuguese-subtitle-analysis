.PHONY: all run subtitles tokens

run:
	deno run --allow-read --allow-net index.ts

subtitles:
	deno run --allow-read --allow-net --allow-write parse-subtitles.ts

tokens:
	deno run --allow-read --allow-net --allow-write create-tokens.ts