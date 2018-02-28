# add-gravatar-to-yml

Add a gravatar line after an email line in many yml files with the appropriate md5 hash.

This is useful if you want to use something like GitHub pages for your blog where you don't have an md5 function available at page generation time.

An example is quicker to understand:

### Before

```yml
email: damien@envytech.co.uk
name: Damien Guard
```

### After

```yml
email: damien@envytech.co.uk
gravatar: dc72963e7279d34c85ed4c0b731ce5a9
name: Damien Guard
```

## Warnings

- Backup files before use!!
- Check your files once it has run - with a DIFF
- utf8 is **always** assumed by this tool. If you file is anything else it will be mangled
- Any existing lines beginning with `gravatar:` are removed!

## Usage

Call this with node and the path you wish to scan. e.g.

`node add-gravatar-to-yml\src\index.js somefolder`
