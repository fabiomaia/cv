#include <openssl/hmac.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <openssl/bio.h>
#include <openssl/evp.h>

int main(int argc, char *argv[]) {
	if (argc < 2) {
		fprintf(stderr, "Usage: %s <input string>\n", argv[0]);
		return 1;
	}

	char key[] = "1234567890";
	unsigned char result[32];
	unsigned int result_len;

	HMAC(EVP_sha256(), key, strlen(key), (unsigned char*) argv[1], strlen(argv[1]), result, &result_len);

	// print as base64
	BIO *b64 = BIO_new(BIO_f_base64());
	BIO *bio = BIO_new_fp(stdout, BIO_NOCLOSE);

	// Disable line breaks
	BIO_set_flags(b64, BIO_FLAGS_BASE64_NO_NL);

	BIO_push(b64, bio);
	BIO_write(b64, result, result_len);
	BIO_flush(b64);

	BIO_free_all(bio);

	return 0;
}
