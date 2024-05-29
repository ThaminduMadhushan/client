import React from 'react'
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

function Test() {
  return (
    <div style={{ height: "100%" }}>
      <PowerBIEmbed
	embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
		id: 'a5cefdea-685a-4691-8c65-d98250e385c5',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=a5cefdea-685a-4691-8c65-d98250e385c5&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYWEyMzJkYjItN2E3OC00NDE0LWE1MjktMzNkYjkxMjRjYmE3LyIsImlhdCI6MTcxNjM4NTU0NCwibmJmIjoxNzE2Mzg1NTQ0LCJleHAiOjE3MTYzOTExMTEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFQWFhOMWRNK0t3K0Y0V1N3UHNUMFAydXlOeXFLVkZLQkNLTXhvSWMzaHplQUoyekg1K1VxN0tGTlE0Uy90T0xBIiwiYW1yIjpbInB3ZCIsInJzYSJdLCJhcHBpZCI6IjIzZDhmNmJkLTFlYjAtNGNjMi1hMDhjLTdiZjUyNWM2N2JjZCIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiZWFjZDU5YmQtYzQ1MS00NTEwLWI2NzEtMTM5M2EwMDM4Y2YwIiwiZmFtaWx5X25hbWUiOiJJTS8yMDIwLzAyMiIsImdpdmVuX25hbWUiOiJQVU5ZQVdBUkRIQU5BIFAuVC5NLiIsImlwYWRkciI6IjE5Mi4yNDguMjQuNTEiLCJuYW1lIjoiSU0vMjAyMC8wMjIgLSBQVU5ZQVdBUkRIQU5BIFAuVC5NLiIsIm9pZCI6IjgyODA2ZTczLTg3YjQtNGU1Ni04ODk4LThkNTE2MjA3YzgzNSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNDM2NjgxMjU5LTI0NDE0MzI4NzMtMjUxNTQ3ODUwNS0xMTI4MDQiLCJwdWlkIjoiMTAwMzIwMDFGNkQ2MTRGQSIsInJoIjoiMC5BVlVBc2kwanFuaDZGRVNsS1RQYmtTVExwd2tBQUFBQUFBQUF3QUFBQUFBQUFBQ19BQ1EuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWQuQWxsIFN0b3JhZ2VBY2NvdW50LlJlYWRXcml0ZS5BbGwgVGVuYW50LlJlYWQuQWxsIFRlbmFudC5SZWFkV3JpdGUuQWxsIFVzZXJTdGF0ZS5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Img4YlIydjJHSEtQdW9hZllSVXdndnRWSm9FQXJ0cllQd2lEVDlPWXdkc28iLCJ0aWQiOiJhYTIzMmRiMi03YTc4LTQ0MTQtYTUyOS0zM2RiOTEyNGNiYTciLCJ1bmlxdWVfbmFtZSI6InB1bnlhd2EtaW0yMDAyMkBzdHUua2xuLmFjLmxrIiwidXBuIjoicHVueWF3YS1pbTIwMDIyQHN0dS5rbG4uYWMubGsiLCJ1dGkiOiJiaUNfaVBhaVkwQ2liVXFYMlluRkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.TuPUrKGoFnb0Z982Ic1f3UHCwV-ixR5xyVd8EvmUDFaimRLgiV3_m9-72lchAZw5vIDEBIshk9tEErCoUcoYG3kNTQxg_pP9jzl0jcbCB6pcJK0vgiJDZQlwhqS1aYTmCtWq-EwuCC-vuBNCu1rOQ85TRrVCWGK4yebLLO_TaGsP_l2_M185gzmp5wUQMP7qt9Dazwxg8D4AO8NolkYkNJTRHeLl4uwCywjRI2BBuqYrn-FWuQcFJBGTT62zLMgYu876JeuoBCisXUqWKT_73LeXxUUV3Pqe_8carHSxVE-rWIg-7z2Zqk3BDdcQV540PUNnFX5QtIJ2MbY9Inl2Ig',
		tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = {
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}

	cssClassName = { "reportClass" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport;
	}}
/>
    </div>
  )
}

export default Test
