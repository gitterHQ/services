.PHONY: test test-cov istanbul

test:
	./node_modules/.bin/mocha --reporter spec test/ lib/*/test

test-cov: istanbul

istanbul:
	./node_modules/.bin/istanbul cover _mocha -- -R spec  test/ lib/*/test
	./node_modules/.bin/istanbul check-coverage \
		--statements 90 \
		--functions 77 \
		--functions 100 \
		--lines 96
