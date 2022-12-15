Be sure to set:::

TOKEN=''
CLIENT_ID=''
GUILD_ID=''

then use, for example:::

/colour-me-surprised #123456

docker build . -t jaynericguy/zlurby --platform linux/arm64/v8
docker push jaynericguy/zlurby

> Other commands

This removes all files from the repository and adds them back (this time respecting the rules in your .gitignore).

git rm -rf --cached .
git add .