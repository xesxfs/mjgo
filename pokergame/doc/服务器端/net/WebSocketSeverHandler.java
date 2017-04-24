package com.vequn.net;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.vequn.cache.Global;
import com.vequn.nets.http.HttpHandler;
import com.vequn.skpk.player.PlayerManager;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.websocketx.CloseWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PingWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PongWebSocketFrame;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;

public class WebSocketSeverHandler extends ChannelInboundHandlerAdapter{
	private static final Logger logger = Logger.getLogger(WebSocketSeverHandler.class.getName());
	private WebSocketServerHandshaker shaker;
	private int port;
	private String host;	
	public WebSocketSeverHandler(String host, int port) {
		this.port = port;
		this.host = host;
	}	
/*	
 *
 * ��ǰ�����������
*/
	public static AtomicInteger PLAYER_ONLINE = new AtomicInteger(0);
	//private static LinkedList<Channel> players = null;

	/**
	 * �ͻ��˽���
	 */
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		PLAYER_ONLINE.incrementAndGet();
		//ChannelGroup group = Global.group;
		Global.group.add(ctx.channel());
		System.out.println("�ͻ��˽���");
	}

	/**
	 * �ͻ��˶Ͽ�
	 */
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		PLAYER_ONLINE.decrementAndGet();
		PlayerManager.playerLogout(ctx);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		System.err.println(Global.players.get(ctx.channel().id()).getNickname() + " : ����");
		PlayerManager.playerLogout(ctx);
		cause.printStackTrace();
		// ctx.close();
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		ctx.flush();
	}
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		if (msg instanceof FullHttpRequest) {
			shaker = HttpHandler.handler(ctx, (FullHttpRequest) msg,shaker, port, host);
		} else if (msg instanceof WebSocketFrame) {
			websocketHandler(ctx, (WebSocketFrame) msg);
		}
	}

	public void websocketHandler(ChannelHandlerContext ctx, WebSocketFrame msg) {
		// �ж��Ƿ�ر���·ָ��
		if (msg instanceof CloseWebSocketFrame) {
			shaker.close(ctx.channel(), (CloseWebSocketFrame) msg.retain());
		}
		// �ж��Ƿ�ping��Ϣ
		if (msg instanceof PingWebSocketFrame) {
			ctx.channel().write(new PongWebSocketFrame(msg.content().retain()));
		}

		// ��֧���ı���Ϣ����֧�ֶ�������Ϣ
		if (!(msg instanceof TextWebSocketFrame)) {
			// System.err.println("��֧���ı���Ϣ����֧�ֶ�������Ϣ");
			// throw new UnsupportedOperationException(String.format("%s frame
			// types not supported", msg.getClass().getName()));
			return;
		}

		// ����Ӧ����Ϣ
		String request = ((TextWebSocketFrame) msg).text();
		if (logger.isLoggable(Level.FINE)) {
			logger.fine(String.format("%s received %s", ctx.channel(), request));
		}
		Broadcast.broadcast(request, ctx);

	}

	@Override
	public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
		super.userEventTriggered(ctx, evt);
	}
}
