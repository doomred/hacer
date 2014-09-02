#/usr/bin/env python
#usage python strip_metablock.py .../path/to/any.user.js
#copyleft dye E. jarhoo
#license ISC

import sys
import os

if len(sys.argv) < 2:
	sys.exit('Usage:  python %s .../path/to/any.user.js' % sys.argv[0])
if not os.path.exists(sys.argv[1]):
	sys.exit('ERROR:  file `%s\' not found' % sys.argv[1])

fd = open(sys.argv[1], "r")
f_content = fd.readlines()
fd.close()

for l in f_content:
	sys.stdout.write(l)
	if "==/UserScript==" in l:
		break
