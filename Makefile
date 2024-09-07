build-app-invoice-generation:
	docker build . -t invoice-generation-rest-api-image -f Dockerfile.production

run-app-invoice-generation:
	docker-compose -f docker-compose-invoice-generation.yml up -d

stop-app-invoice-generation:
	docker-compose -f docker-compose-invoice-generation.yml down
